"""inference.py — TabPFN-3 style classifier and regressor.

Upgrades over original nanoTabPFN:
  - Ensemble inference (n_ensemble members)
  - Feature subsampling for high-dimensional datasets (>max_features cols)
  - Row chunking for scalability (large test sets)
  - KV caching toggle for faster repeated inference
  - Regression support via TabPFN3Regressor

Usage:
    classifier = TabPFN3Classifier(model, device='cuda', n_ensemble=32)
    classifier.fit(X_train, y_train)
    probs = classifier.predict_proba(X_test)  # (N_test, n_classes)
    preds = classifier.predict(X_test)         # (N_test,)

    regressor = TabPFN3Regressor(model, device='cuda', n_ensemble=16)
    regressor.fit(X_train, y_train)
    mu, sigma = regressor.predict(X_test)      # mean and std
"""

from __future__ import annotations

import numpy as np
import torch
import torch.nn.functional as F

from model import NanoTabPFNPlusModel


class TabPFN3Classifier:
    """Scikit-learn compatible classifier with ensembling and chunking.

    Args:
        model:        NanoTabPFNPlusModel instance.
        device:       PyTorch device string ('cpu', 'cuda', 'mps').
        n_ensemble:   Number of ensemble members (feature subsampling runs).
        chunk_size:   Max test rows per forward pass (set lower to save VRAM).
        max_features: If dataset has more features, subsample to this many.
        use_kv_cache: Enable KV caching in transformer layers.
    """

    def __init__(
        self,
        model: NanoTabPFNPlusModel,
        device: str = 'cpu',
        n_ensemble: int = 32,
        chunk_size: int = 4096,
        max_features: int = 500,
        use_kv_cache: bool = True,
    ):
        self.model        = model.to(device)
        self.device       = device
        self.n_ensemble   = n_ensemble
        self.chunk_size   = chunk_size
        self.max_features = max_features
        self.use_kv_cache = use_kv_cache

        # Set by fit()
        self.X_train: np.ndarray | None = None
        self.y_train: np.ndarray | None = None
        self.num_classes: int = 0
        self.classes_: np.ndarray | None = None

    # ------------------------------------------------------------------
    def fit(self, X_train: np.ndarray, y_train: np.ndarray) -> 'TabPFN3Classifier':
        """Store training data (no gradient update — TabPFN is in-context)."""
        self.X_train    = np.array(X_train, dtype=np.float32)
        self.y_train    = np.array(y_train)
        self.classes_   = np.unique(y_train)
        self.num_classes = len(self.classes_)
        # Remap labels to 0..K-1
        label_map       = {c: i for i, c in enumerate(self.classes_)}
        self.y_train_mapped = np.array([label_map[yi] for yi in y_train], dtype=np.int64)
        return self

    # ------------------------------------------------------------------
    def predict_proba(self, X_test: np.ndarray) -> np.ndarray:
        """Predict class probabilities via ensemble inference.

        Args:
            X_test: (N_test, D) feature matrix.
        Returns:
            (N_test, num_classes) probability matrix.
        """
        X_test = np.array(X_test, dtype=np.float32)
        probs_list: list[np.ndarray] = []

        for _ in range(self.n_ensemble):
            # ── Feature subsampling for high-dim datasets ──────────────
            n_feat = X_test.shape[1]
            if n_feat > self.max_features:
                feat_idx = np.random.choice(n_feat, self.max_features, replace=False)
                X_tr = self.X_train[:, feat_idx]
                X_te = X_test[:, feat_idx]
            else:
                X_tr = self.X_train
                X_te = X_test

            # ── Row chunking for large test sets ───────────────────────
            chunk_probs: list[np.ndarray] = []
            for start in range(0, len(X_te), self.chunk_size):
                chunk = X_te[start : start + self.chunk_size]
                p = self._forward_single(X_tr, self.y_train_mapped, chunk)
                chunk_probs.append(p)
            probs_list.append(np.concatenate(chunk_probs, axis=0))

        return np.mean(probs_list, axis=0)  # (N_test, num_classes)

    # ------------------------------------------------------------------
    def predict(self, X_test: np.ndarray) -> np.ndarray:
        """Predict class labels."""
        probs = self.predict_proba(X_test)
        indices = probs.argmax(axis=1)
        return self.classes_[indices]

    # ------------------------------------------------------------------
    def _forward_single(
        self,
        X_tr:  np.ndarray,
        y_tr:  np.ndarray,
        X_te:  np.ndarray,
    ) -> np.ndarray:
        """Run one forward pass, return (N_test, num_classes) probabilities."""
        x = np.concatenate([X_tr, X_te], axis=0)  # (N_train+N_test, D)
        N_train = len(X_tr)

        self.model.eval()
        with torch.no_grad():
            x_t = torch.from_numpy(x).unsqueeze(0).float().to(self.device)   # (1, R, D)
            y_t = torch.from_numpy(y_tr).unsqueeze(0).float().to(self.device) # (1, N_train)

            logits = self.model(
                (x_t, y_t),
                train_test_split_index=N_train,
                task='classification',
                use_kv_cache=self.use_kv_cache,
            )  # (1, N_test, num_outputs)

            logits = logits.squeeze(0)                    # (N_test, num_outputs)
            logits = logits[:, :self.num_classes]         # cut to actual classes
            probs  = F.softmax(logits, dim=-1).cpu().numpy()
        return probs


# ---------------------------------------------------------------------------

class TabPFN3Regressor:
    """Scikit-learn compatible regressor with ensembling and chunking.

    Args:
        model:      NanoTabPFNPlusModel instance.
        device:     PyTorch device string.
        n_ensemble: Number of ensemble members.
        chunk_size: Max test rows per forward pass.
    """

    def __init__(
        self,
        model: NanoTabPFNPlusModel,
        device: str = 'cpu',
        n_ensemble: int = 16,
        chunk_size: int = 4096,
    ):
        self.model      = model.to(device)
        self.device     = device
        self.n_ensemble = n_ensemble
        self.chunk_size = chunk_size

        self.X_train: np.ndarray | None = None
        self.y_train: np.ndarray | None = None
        self._y_mean: float = 0.0
        self._y_std:  float = 1.0

    # ------------------------------------------------------------------
    def fit(self, X_train: np.ndarray, y_train: np.ndarray) -> 'TabPFN3Regressor':
        self.X_train  = np.array(X_train, dtype=np.float32)
        self.y_train  = np.array(y_train, dtype=np.float32)
        self._y_mean  = float(self.y_train.mean())
        self._y_std   = float(self.y_train.std()) + 1e-8
        return self

    # ------------------------------------------------------------------
    def predict(
        self, X_test: np.ndarray
    ) -> tuple[np.ndarray, np.ndarray]:
        """Return (mu, sigma) predictions in original label scale."""
        X_test = np.array(X_test, dtype=np.float32)
        mus, sigs = [], []

        for _ in range(self.n_ensemble):
            chunk_mu, chunk_sig = [], []
            for start in range(0, len(X_test), self.chunk_size):
                chunk = X_test[start : start + self.chunk_size]
                mu, sig = self._forward_single(self.X_train, self.y_train, chunk)
                chunk_mu.append(mu)
                chunk_sig.append(sig)
            mus.append(np.concatenate(chunk_mu))
            sigs.append(np.concatenate(chunk_sig))

        mu_mean  = np.mean(mus, axis=0) * self._y_std + self._y_mean
        sig_mean = np.mean(sigs, axis=0) * self._y_std
        return mu_mean, sig_mean

    # ------------------------------------------------------------------
    def _forward_single(
        self, X_tr: np.ndarray, y_tr: np.ndarray, X_te: np.ndarray
    ) -> tuple[np.ndarray, np.ndarray]:
        x = np.concatenate([X_tr, X_te], axis=0)
        N_train = len(X_tr)

        self.model.eval()
        with torch.no_grad():
            x_t = torch.from_numpy(x).unsqueeze(0).float().to(self.device)
            y_t = torch.from_numpy(y_tr).unsqueeze(0).float().to(self.device)

            mu, sigma = self.model(
                (x_t, y_t),
                train_test_split_index=N_train,
                task='regression',
                use_kv_cache=True,
            )
            mu    = mu.squeeze(0).cpu().numpy()
            sigma = sigma.squeeze(0).cpu().numpy()
        return mu, sigma
