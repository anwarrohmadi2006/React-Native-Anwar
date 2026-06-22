"""nanoTabPFN-plus model.py

Upgraded architecture toward TabPFN-3 parity:
  1. RandomizedFeatureTokenEncoder  — per-feature tokens + NaN handling
  2. AdvancedTargetEncoder           — multi-class + regression + unknown token
  3. mHCResidual                     — Manifold-Constrained Hyper-Connections (DeepSeek arXiv:2512.24880)
  4. CachedTransformerLayer          — dual attention (row<->col) + KV caching + mHC streams
  5. MultiTaskDecoder                — classification + regression + temperature calibration
  6. NanoTabPFNPlusModel             — full model combining all components

Original nanoTabPFN: https://github.com/automl/nanoTabPFN
TabPFN-3 paper:      https://arxiv.org/abs/2605.13986
mHC paper:           https://arxiv.org/abs/2512.24880
"""

import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
from torch.nn.modules.transformer import MultiheadAttention, LayerNorm


# ---------------------------------------------------------------------------
# 1. Feature Encoder — Randomized Feature Tokens + NaN handling
# ---------------------------------------------------------------------------

class RandomizedFeatureTokenEncoder(nn.Module):
    """Encodes tabular features using per-feature position tokens.

    Key upgrade over original nanoTabPFN:
    - Randomized/learned embedding per feature index (not shared linear)
    - Explicit NaN / missing value token
    - Per-feature normalization using only training data stats

    Args:
        embedding_size: Dimensionality of embeddings.
        max_features:   Maximum number of features supported (for embedding table).
    """

    def __init__(self, embedding_size: int, max_features: int = 500):
        super().__init__()
        # One learnable token per feature position
        self.feature_token = nn.Embedding(max_features, embedding_size)
        # Scalar value → embedding
        self.value_encoder = nn.Linear(1, embedding_size)
        # Special token for NaN / missing cells
        self.nan_token = nn.Parameter(torch.randn(embedding_size) * 0.02)

    def forward(self, x: torch.Tensor, train_test_split_index: int) -> torch.Tensor:
        """
        Args:
            x:                      (B, R, C) raw feature values, may contain NaN
            train_test_split_index: number of training rows
        Returns:
            (B, R, C, E) feature embeddings
        """
        B, R, C = x.shape

        # --- NaN mask ---
        nan_mask = torch.isnan(x)  # (B, R, C)
        x_clean = x.clone()
        x_clean[nan_mask] = 0.0

        # --- Normalize using train split statistics ---
        x_train = x_clean[:, :train_test_split_index, :]  # (B, N_train, C)
        mean = x_train.mean(dim=1, keepdim=True)           # (B, 1, C)
        std  = x_train.std(dim=1, keepdim=True).clamp(min=1e-8)
        x_norm = ((x_clean - mean) / std).clamp(-100, 100)  # (B, R, C)

        # --- Value embedding ---
        x_emb = self.value_encoder(x_norm.unsqueeze(-1))   # (B, R, C, E)

        # --- Add per-feature position token ---
        feat_ids = torch.arange(C, device=x.device)        # (C,)
        feat_tok = self.feature_token(feat_ids)             # (C, E)
        x_emb = x_emb + feat_tok.unsqueeze(0).unsqueeze(0) # (B, R, C, E)

        # --- Replace NaN cells with nan_token ---
        nan_expanded = nan_mask.unsqueeze(-1).expand_as(x_emb)
        nan_fill = self.nan_token.view(1, 1, 1, -1).expand_as(x_emb)
        x_emb = torch.where(nan_expanded, nan_fill, x_emb)

        return x_emb  # (B, R, C, E)


# ---------------------------------------------------------------------------
# 2. Target Encoder — multi-class + regression + unknown token for test rows
# ---------------------------------------------------------------------------

class AdvancedTargetEncoder(nn.Module):
    """Encodes training labels and provides unknown token for test rows.

    Key upgrade over original nanoTabPFN:
    - Class embedding per integer label (not shared linear)
    - Separate scalar encoder for regression tasks
    - Unknown/mask token for test rows (instead of mean padding)
    - Supports many-class classification (up to max_classes)

    Args:
        embedding_size: Dimensionality of embeddings.
        max_classes:    Max number of classes for classification embedding table.
    """

    def __init__(self, embedding_size: int, max_classes: int = 64):
        super().__init__()
        # Classification: one embedding per class label
        self.class_emb = nn.Embedding(max_classes, embedding_size, padding_idx=0)
        # Regression: scalar → embedding
        self.scalar_encoder = nn.Linear(1, embedding_size)
        # Test rows: learned "I don't know the label" token
        self.unknown_token = nn.Parameter(torch.randn(embedding_size) * 0.02)

    def forward(
        self,
        y_train: torch.Tensor,
        num_rows: int,
        task: str = 'classification',
    ) -> torch.Tensor:
        """
        Args:
            y_train:  (B, N_train) or (B, N_train, 1) — training labels
            num_rows: total rows (train + test)
            task:     'classification' or 'regression'
        Returns:
            (B, R, 1, E) target embeddings
        """
        # Normalise shape to (B, N_train)
        if y_train.dim() == 3:
            y_train = y_train.squeeze(-1)
        B, N_train = y_train.shape
        N_test = num_rows - N_train

        if task == 'classification':
            y_int = y_train.long().clamp(min=0)            # safety clamp
            train_emb = self.class_emb(y_int)              # (B, N_train, E)
        else:  # regression
            mu  = y_train.mean(dim=1, keepdim=True)
            std = y_train.std(dim=1,  keepdim=True).clamp(min=1e-8)
            y_norm = ((y_train - mu) / std).unsqueeze(-1)  # (B, N_train, 1)
            train_emb = self.scalar_encoder(y_norm)        # (B, N_train, E)

        # Unknown token for test rows
        test_emb = (
            self.unknown_token
            .view(1, 1, -1)
            .expand(B, N_test, -1)
        )  # (B, N_test, E)

        y_emb = torch.cat([train_emb, test_emb], dim=1)   # (B, R, E)
        return y_emb.unsqueeze(2)                          # (B, R, 1, E)


# ---------------------------------------------------------------------------
# 3. mHC — Manifold-Constrained Hyper-Connections (DeepSeek arXiv:2512.24880)
# ---------------------------------------------------------------------------

def sinkhorn_projection(logits: torch.Tensor, iterations: int = 20) -> torch.Tensor:
    """Project a square matrix onto the Birkhoff polytope (doubly stochastic).

    Uses the Sinkhorn-Knopp algorithm: alternate row-normalisation and
    column-normalisation until the matrix is both row-stochastic and
    column-stochastic (all entries >= 0 and every row/col sums to 1).

    This guarantees spectral_norm(M) <= 1, which prevents gradient explosion
    (the key stability property used in mHC).

    Args:
        logits:     (n, n) learnable parameter matrix.
        iterations: Number of Sinkhorn iterations (20 is sufficient for training).
    Returns:
        (n, n) doubly-stochastic matrix.
    """
    M = torch.exp(logits)  # ensure positivity
    for _ in range(iterations):
        M = M / M.sum(dim=-1, keepdim=True).clamp(min=1e-8)  # row norm
        M = M / M.sum(dim=-2, keepdim=True).clamp(min=1e-8)  # col norm
    return M


class mHCResidual(nn.Module):
    """Manifold-Constrained Hyper-Connections residual mixing module.

    Replaces the plain residual connection in each Transformer layer with a
    learnable, doubly-stochastic mixing matrix constrained to the Birkhoff
    polytope via Sinkhorn-Knopp projection.  This stabilises training by
    guaranteeing the identity-mapping property (spectral norm <= 1) while
    still allowing the model to learn richer inter-stream interactions.

    Design:
      - n_streams parallel copies of the hidden state are maintained.
      - After each sub-layer (attention / MLP), the output of stream 0
        (the main stream) is mixed with all streams through H_res.
      - The doubly-stochastic constraint on H_res prevents activation
        explosion / collapse.

    Args:
        embedding_size: Hidden dimensionality.
        n_streams:      Number of parallel residual streams (default 4).
        sinkhorn_iters: Number of Sinkhorn iterations (default 20).
    """

    def __init__(self, embedding_size: int, n_streams: int = 4, sinkhorn_iters: int = 20):
        super().__init__()
        self.n_streams = n_streams
        self.sinkhorn_iters = sinkhorn_iters
        # Learnable logits — initialised near identity so training starts stable
        eye = torch.eye(n_streams)
        noise = torch.randn(n_streams, n_streams) * 0.01
        self.res_logits = nn.Parameter(torch.log(eye + 1e-6) + noise)
        # Per-stream projection to produce n_streams copies of hidden
        self.stream_proj = nn.Linear(embedding_size, embedding_size * n_streams, bias=False)
        # Output projection back to embedding_size
        self.out_proj = nn.Linear(embedding_size * n_streams, embedding_size, bias=False)
        # Initialise output projection close to zero for stable training start
        nn.init.normal_(self.out_proj.weight, std=0.02)

    def forward(self, main: torch.Tensor, residual: torch.Tensor) -> torch.Tensor:
        """Compute mHC-mixed residual update.

        Args:
            main:     (*, E) output of the current sub-layer (attention or MLP).
            residual: (*, E) input to the sub-layer (the skip-connection source).
        Returns:
            (*, E) updated hidden state.
        """
        *batch_dims, E = main.shape
        S = self.n_streams

        # Project residual into n_streams copies: (*, E*S) -> (*, S, E)
        streams = self.stream_proj(residual).view(*batch_dims, S, E)  # (*, S, E)

        # Doubly-stochastic mixing matrix: (S, S)
        H_res = sinkhorn_projection(self.res_logits, self.sinkhorn_iters)

        # Mix streams: weighted sum over stream dimension -> (*, S, E)
        # H_res[i, j] = contribution of stream j to stream i
        mixed = torch.einsum('...se,ts->...te', streams, H_res)  # (*, S, E)

        # Collapse S streams back to (*, E*S) then project to (*, E)
        mixed_flat = mixed.reshape(*batch_dims, S * E)
        delta = self.out_proj(mixed_flat)  # (*, E)

        # Final residual: main stream output + mHC-constrained residual mix
        return main + delta


# ---------------------------------------------------------------------------
# 4. Transformer Layer — dual attention (row <-> col) + KV caching + mHC
# ---------------------------------------------------------------------------

class CachedTransformerLayer(nn.Module):
    """Dual-attention transformer layer with mHC residual connections.

    Implements the core TabPFN architectural insight:
    - Attention BETWEEN features (within each row)  -> col-axis attention
    - Attention BETWEEN datapoints (within each col) -> row-axis attention
      - Train rows attend to train rows (self-attention)
      - Test  rows attend to train rows (cross-attention)

    mHC upgrade: replaces plain x = x + attn(x) residuals with manifold-
    constrained hyper-connection mixing, guaranteeing spectral_norm <= 1
    and eliminating gradient explosion.

    Args:
        embedding_size:  Model dimensionality.
        nhead:           Number of attention heads.
        mlp_hidden_size: Hidden size of the feedforward MLP.
        n_streams:       Number of mHC parallel streams (default 4).
        layer_norm_eps:  Epsilon for LayerNorm.
    """

    def __init__(
        self,
        embedding_size: int,
        nhead: int,
        mlp_hidden_size: int,
        n_streams: int = 4,
        layer_norm_eps: float = 1e-5,
    ):
        super().__init__()
        self.attn_features    = MultiheadAttention(embedding_size, nhead, batch_first=True)
        self.attn_datapoints  = MultiheadAttention(embedding_size, nhead, batch_first=True)
        self.linear1 = nn.Linear(embedding_size, mlp_hidden_size)
        self.linear2 = nn.Linear(mlp_hidden_size, embedding_size)
        self.norm1 = LayerNorm(embedding_size, eps=layer_norm_eps)
        self.norm2 = LayerNorm(embedding_size, eps=layer_norm_eps)
        self.norm3 = LayerNorm(embedding_size, eps=layer_norm_eps)
        # mHC residual modules — one per sub-layer (attn_feat, attn_data, mlp)
        self.mhc_feat = mHCResidual(embedding_size, n_streams)
        self.mhc_data = mHCResidual(embedding_size, n_streams)
        self.mhc_mlp  = mHCResidual(embedding_size, n_streams)

    def forward(
        self,
        src: torch.Tensor,
        train_test_split_index: int,
        kv_cache: dict | None = None,
    ) -> torch.Tensor:
        """
        Args:
            src:                    (B, R, C, E)
            train_test_split_index: N_train
            kv_cache:               optional dict {'k': tensor, 'v': tensor}
                                    pre-computed from training data for this layer
        Returns:
            (B, R, C, E) updated embeddings
        """
        B, R, C, E = src.shape

        # ── (a) Attention between features (row-wise) ──────────────────────
        src_r = src.reshape(B * R, C, E)
        attn_out, _ = self.attn_features(src_r, src_r, src_r)
        # mHC residual: replace plain x + attn(x)
        src_r_new = self.mhc_feat(attn_out, src_r)      # (B*R, C, E)
        src = src_r_new.reshape(B, R, C, E)
        src = self.norm1(src)

        # ── (b) Attention between datapoints (col-wise) ────────────────────
        src_c = src.transpose(1, 2).reshape(B * C, R, E)
        train_slice = src_c[:, :train_test_split_index, :]

        if kv_cache is not None:
            k = kv_cache['k']
            v = kv_cache['v']
        else:
            k = v = train_slice

        src_train, _ = self.attn_datapoints(train_slice, k, v)
        test_slice   = src_c[:, train_test_split_index:, :]
        src_test, _  = self.attn_datapoints(test_slice, k, v)

        # mHC residual for row-wise attention
        src_train_new = self.mhc_data(src_train, train_slice)  # (B*C, N_train, E)
        src_test_new  = self.mhc_data(src_test,  test_slice)   # (B*C, N_test,  E)

        src_c_new = torch.cat([src_train_new, src_test_new], dim=1)  # (B*C, R, E)
        src = src_c_new.reshape(B, C, R, E).transpose(1, 2)
        src = self.norm2(src)

        # ── (c) Feed-forward MLP ───────────────────────────────────────────
        mlp_in  = src.reshape(B * R * C, E)
        mlp_out = self.linear2(F.gelu(self.linear1(mlp_in))).reshape(B, R, C, E)
        # mHC residual for MLP
        src = self.mhc_mlp(mlp_out, src)
        src = self.norm3(src)

        return src

    def compute_kv_cache(self, src: torch.Tensor) -> dict:
        """Pre-compute K, V tensors from training embeddings for later reuse.

        Args:
            src: (B, N_train, C, E) training-only embeddings after feature attention
        Returns:
            dict with 'k' and 'v' tensors of shape (B*C, N_train, E)
        """
        B, N_train, C, E = src.shape
        src_c = src.transpose(1, 2).reshape(B * C, N_train, E)
        return {'k': src_c, 'v': src_c}


# ---------------------------------------------------------------------------
# 4. Decoder — classification + regression + temperature calibration
# ---------------------------------------------------------------------------

class MultiTaskDecoder(nn.Module):
    """MLP decoder supporting classification and regression with calibration.

    Key upgrades:
    - Temperature scaling for calibrated classification probabilities
    - Gaussian head for regression: predicts mean + log_sigma → (mu, sigma)
    - Shared hidden layer reduces parameter count

    Args:
        embedding_size:  Input dimensionality.
        mlp_hidden_size: Hidden layer size.
        num_outputs:     Number of output classes (for classification).
    """

    def __init__(self, embedding_size: int, mlp_hidden_size: int, num_outputs: int):
        super().__init__()
        self.linear1 = nn.Linear(embedding_size, mlp_hidden_size)
        # Classification head
        self.clf_head = nn.Linear(mlp_hidden_size, num_outputs)
        # Regression head: predicts (mu, log_sigma)
        self.reg_head = nn.Linear(mlp_hidden_size, 2)
        # Learnable temperature for classification calibration (init=1 → no-op)
        self.temperature = nn.Parameter(torch.ones(1))

    def forward(
        self, x: torch.Tensor, task: str = 'classification'
    ) -> torch.Tensor | tuple[torch.Tensor, torch.Tensor]:
        """
        Args:
            x:    (B, N_test, E)
            task: 'classification' or 'regression'
        Returns:
            classification: (B, N_test, num_outputs) logits (temperature-scaled)
            regression:     tuple ((B, N_test), (B, N_test)) → (mu, sigma)
        """
        h = F.gelu(self.linear1(x))  # (B, N_test, mlp_hidden)

        if task == 'regression':
            out     = self.reg_head(h)             # (B, N_test, 2)
            mu      = out[..., 0]                  # (B, N_test)
            log_sig = out[..., 1].clamp(-6, 6)     # stability clamp
            sigma   = log_sig.exp()
            return mu, sigma

        # classification
        logits = self.clf_head(h)                  # (B, N_test, num_outputs)
        temp   = self.temperature.clamp(min=0.1)   # prevent division by zero
        return logits / temp


# ---------------------------------------------------------------------------
# 5. Full Model
# ---------------------------------------------------------------------------

class NanoTabPFNPlusModel(nn.Module):
    """nanoTabPFN-plus: full TabPFN-3 inspired model.

    Combines all upgraded components into a single nn.Module that is
    compatible with the original nanoTabPFN training interface.

    Args:
        embedding_size:    Model dimensionality (default 128).
        num_attention_heads: Attention heads per layer (default 4).
        mlp_hidden_size:   FF hidden size (default 256).
        num_layers:        Number of transformer layers (default 4).
        num_outputs:       Max classes for classification head (default 10).
        max_features:      Max features for feature token embedding (default 500).
        max_classes:       Max classes for target embedding (default 64).
        n_streams:         Number of mHC parallel residual streams (default 4).
    """

    def __init__(
        self,
        embedding_size:      int = 128,
        num_attention_heads: int = 4,
        mlp_hidden_size:     int = 256,
        num_layers:          int = 4,
        num_outputs:         int = 10,
        max_features:        int = 500,
        max_classes:         int = 64,
        n_streams:           int = 4,
    ):
        super().__init__()
        self.feature_encoder = RandomizedFeatureTokenEncoder(embedding_size, max_features)
        self.target_encoder  = AdvancedTargetEncoder(embedding_size, max_classes)
        self.transformer_blocks = nn.ModuleList([
            CachedTransformerLayer(
                embedding_size, num_attention_heads, mlp_hidden_size,
                n_streams=n_streams
            )
            for _ in range(num_layers)
        ])
        self.decoder = MultiTaskDecoder(embedding_size, mlp_hidden_size, num_outputs)

    def forward(
        self,
        src: tuple[torch.Tensor, torch.Tensor],
        train_test_split_index: int,
        task: str = 'classification',
        use_kv_cache: bool = False,
    ) -> torch.Tensor | tuple[torch.Tensor, torch.Tensor]:
        """
        Args:
            src:                    (x, y_train)
                                    x:       (B, R, C)
                                    y_train: (B, N_train)
            train_test_split_index: N_train
            task:                   'classification' or 'regression'
            use_kv_cache:           if True, pre-computes KV from train rows
        Returns:
            classification: (B, N_test, num_outputs) logits
            regression:     (mu, sigma) each (B, N_test)
        """
        x_src, y_src = src

        # Encode features → (B, R, C, E)
        x_emb = self.feature_encoder(x_src, train_test_split_index)
        # Encode targets → (B, R, 1, E)
        y_emb = self.target_encoder(y_src, num_rows=x_src.shape[1], task=task)
        # Concatenate: (B, R, C+1, E)
        hidden = torch.cat([x_emb, y_emb], dim=2)

        # Transformer layers
        kv_caches = [None] * len(self.transformer_blocks)
        for i, block in enumerate(self.transformer_blocks):
            if use_kv_cache:
                train_hidden = hidden[:, :train_test_split_index]
                kv_caches[i] = block.compute_kv_cache(train_hidden)
            hidden = block(hidden, train_test_split_index, kv_cache=kv_caches[i])

        # Extract test-row target embeddings → (B, N_test, E)
        test_emb = hidden[:, train_test_split_index:, -1, :]

        # Decode
        return self.decoder(test_emb, task=task)
