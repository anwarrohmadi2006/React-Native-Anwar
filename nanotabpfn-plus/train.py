"""train.py — Training pipeline for nanoTabPFN-plus.

Supports:
  - Pretraining on synthetic datasets from SyntheticTabularPrior
  - Multi-task loss (classification cross-entropy + regression NLL)
  - ScheduleFree AdamW optimizer (from original nanoTabPFN)
  - Optional HDF5 dataloader (compatible with original nanoTabPFN .h5 files)
  - Periodic evaluation on real datasets

Usage:
    python train.py
"""

from __future__ import annotations

import random
import time
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.nn.utils import clip_grad_norm_

try:
    import schedulefree
    HAS_SCHEDULEFREE = True
except ImportError:
    HAS_SCHEDULEFREE = False

from model import NanoTabPFNPlusModel
from prior import SyntheticTabularPrior
from inference import TabPFN3Classifier


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def set_seed(seed: int = 0):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)


def get_device() -> str:
    if torch.cuda.is_available():  return 'cuda'
    if torch.backends.mps.is_available(): return 'mps'
    return 'cpu'


# ---------------------------------------------------------------------------
# Loss functions
# ---------------------------------------------------------------------------

def classification_loss(
    logits: torch.Tensor,   # (B, N_test, num_classes)
    targets: torch.Tensor,  # (B, N_test) int labels
) -> torch.Tensor:
    """Cross-entropy loss over all test predictions in the batch."""
    B, N, C = logits.shape
    return F.cross_entropy(
        logits.reshape(B * N, C),
        targets.reshape(B * N).long(),
    )


def regression_loss(
    mu: torch.Tensor,     # (B, N_test)
    sigma: torch.Tensor,  # (B, N_test)
    targets: torch.Tensor,# (B, N_test)
) -> torch.Tensor:
    """Gaussian negative log-likelihood loss (calibrated regression)."""
    # NLL = log(sigma) + 0.5 * ((target - mu) / sigma)^2
    loss = torch.log(sigma.clamp(min=1e-6)) + 0.5 * ((targets - mu) / sigma.clamp(min=1e-6)) ** 2
    return loss.mean()


def multi_task_loss(
    output,
    targets: torch.Tensor,
    task: str,
) -> torch.Tensor:
    """Dispatch to the correct loss function based on task."""
    if task == 'classification':
        return classification_loss(output, targets)
    else:
        mu, sigma = output
        return regression_loss(mu, sigma, targets)


# ---------------------------------------------------------------------------
# Batch collation from SyntheticTabularPrior
# ---------------------------------------------------------------------------

def collate_prior_batch(
    datasets: list[tuple[np.ndarray, np.ndarray, str]],
    train_frac: float = 0.7,
    max_features: int = 500,
) -> dict:
    """Collate a list of (X, y, task) tuples into a padded batch dict.

    All datasets in the batch must have the same task type (sampled from prior).
    Pads features to the maximum number of columns in the batch with NaN.
    Pads rows to the maximum number of rows.

    Returns:
        dict with keys:
            x:                      (B, R_max, C_max)
            y:                      (B, R_max)
            train_test_split_index: int
            task:                   str
    """
    # All tasks must match for a single batch
    tasks = [t for _, _, t in datasets]
    task = tasks[0]  # use first

    max_rows = max(len(X) for X, _, _ in datasets)
    max_cols = min(max(X.shape[1] for X, _, _ in datasets), max_features)
    B = len(datasets)

    x_batch = np.full((B, max_rows, max_cols), np.nan, dtype=np.float32)
    y_batch = np.zeros((B, max_rows), dtype=np.float32)
    train_split = int(max_rows * train_frac)

    for i, (X, y, _) in enumerate(datasets):
        n, d = X.shape
        d = min(d, max_cols)
        x_batch[i, :n, :d] = X[:, :d]
        y_batch[i, :n] = y

    return {
        'x':   torch.from_numpy(x_batch),
        'y':   torch.from_numpy(y_batch),
        'train_test_split_index': train_split,
        'task': task,
    }


# ---------------------------------------------------------------------------
# Evaluation
# ---------------------------------------------------------------------------

def eval_on_sklearn_datasets(classifier: TabPFN3Classifier) -> dict:
    """Evaluate classifier on a small set of standard sklearn datasets."""
    from sklearn.datasets import load_breast_cancer, load_wine, load_iris
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import accuracy_score, roc_auc_score, balanced_accuracy_score

    datasets = [
        load_breast_cancer(return_X_y=True),
        load_wine(return_X_y=True),
        load_iris(return_X_y=True),
    ]

    scores = {'acc': 0.0, 'balanced_acc': 0.0, 'roc_auc': 0.0}
    for X, y in datasets:
        X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.5, random_state=0)
        classifier.fit(X_tr, y_tr)
        probs = classifier.predict_proba(X_te)
        preds = probs.argmax(axis=1)
        scores['acc']          += accuracy_score(y_te, preds)
        scores['balanced_acc'] += balanced_accuracy_score(y_te, preds)
        try:
            auc_probs = probs[:, 1] if probs.shape[1] == 2 else probs
            scores['roc_auc'] += roc_auc_score(y_te, auc_probs, multi_class='ovr')
        except Exception:
            scores['roc_auc'] += 0.0

    n = len(datasets)
    return {k: v / n for k, v in scores.items()}


# ---------------------------------------------------------------------------
# Main training loop
# ---------------------------------------------------------------------------

def train(
    model: NanoTabPFNPlusModel,
    prior: SyntheticTabularPrior,
    steps:          int   = 5000,
    batch_size:     int   = 16,
    lr:             float = 4e-3,
    device:         str | None = None,
    steps_per_eval: int   = 50,
    max_features:   int   = 500,
    train_frac:     float = 0.7,
) -> tuple[NanoTabPFNPlusModel, list]:
    """Train model on synthetic prior data.

    Args:
        model:          NanoTabPFNPlusModel.
        prior:          SyntheticTabularPrior instance.
        steps:          Training steps.
        batch_size:     Datasets per step.
        lr:             Learning rate.
        device:         PyTorch device.
        steps_per_eval: Evaluate every N steps.
        max_features:   Max cols (pad/truncate to this).
        train_frac:     Fraction of rows used as training in each synthetic dataset.
    Returns:
        (trained model, eval_history)
    """
    if device is None:
        device = get_device()
    model = model.to(device)

    # Optimizer
    if HAS_SCHEDULEFREE:
        optimizer = schedulefree.AdamWScheduleFree(model.parameters(), lr=lr, weight_decay=0.0)
    else:
        optimizer = torch.optim.AdamW(model.parameters(), lr=lr, weight_decay=0.0)

    model.train()
    if HAS_SCHEDULEFREE:
        optimizer.train()

    train_time   = 0.0
    eval_history = []

    print(f"Training nanoTabPFN-plus on {device} for {steps} steps...")
    print(f"Batch size: {batch_size} | LR: {lr} | Max features: {max_features}")
    print("-" * 60)

    try:
        for step in range(steps):
            t0 = time.time()

            # Generate synthetic batch
            datasets = prior.generate_batch(batch_size)
            batch    = collate_prior_batch(datasets, train_frac=train_frac, max_features=max_features)

            x_tensor = batch['x'].to(device)                         # (B, R, C)
            y_tensor = batch['y'].to(device)                         # (B, R)
            split    = batch['train_test_split_index']
            task     = batch['task']

            y_in     = y_tensor[:, :split]   # training labels → model input
            y_target = y_tensor[:, split:]   # test labels → supervision target

            # Forward pass
            output = model(
                (x_tensor, y_in),
                train_test_split_index=split,
                task=task,
            )

            # Loss
            loss = multi_task_loss(output, y_target, task)
            loss.backward()
            clip_grad_norm_(model.parameters(), 1.0)
            optimizer.step()
            optimizer.zero_grad()

            train_time += time.time() - t0

            # Periodic evaluation
            if (step + 1) % steps_per_eval == 0:
                model.eval()
                if HAS_SCHEDULEFREE:
                    optimizer.eval()

                classifier = TabPFN3Classifier(
                    model, device=device, n_ensemble=4, use_kv_cache=True
                )
                scores = eval_on_sklearn_datasets(classifier)
                eval_history.append((train_time, scores))
                s_str = ' | '.join(f'{k} {v:.4f}' for k, v in scores.items())
                print(f"step {step+1:5d} | time {train_time:7.1f}s | loss {loss.item():.4f} | {s_str}")

                model.train()
                if HAS_SCHEDULEFREE:
                    optimizer.train()
            elif (step + 1) % 10 == 0:
                print(f"step {step+1:5d} | time {train_time:7.1f}s | loss {loss.item():.4f} | task: {task}")

    except KeyboardInterrupt:
        print("\nTraining interrupted.")

    return model, eval_history


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == '__main__':
    set_seed(42)
    device = get_device()
    print(f"Using device: {device}")

    model = NanoTabPFNPlusModel(
        embedding_size=128,
        num_attention_heads=4,
        mlp_hidden_size=256,
        num_layers=4,
        num_outputs=10,
        max_features=100,
        max_classes=16,
        n_streams=4,  # mHC: number of parallel residual streams
    )

    prior = SyntheticTabularPrior(
        max_rows=500,
        min_rows=20,
        max_cols=50,
        min_cols=2,
        num_classes=8,
        missing_rate=0.1,
        nonlinear_prob=0.5,
        regression_prob=0.3,
    )

    model, history = train(
        model=model,
        prior=prior,
        steps=10000,
        batch_size=16,
        lr=5e-4,
        steps_per_eval=500,
        max_features=100,
    )

    print("\nFinal evaluation:")
    classifier = TabPFN3Classifier(model, device=device, n_ensemble=8)
    scores = eval_on_sklearn_datasets(classifier)
    for k, v in scores.items():
        print(f"  {k}: {v:.4f}")

    # Save model
    torch.save(model.state_dict(), 'nanotabpfn_plus.pt')
    print("\nModel saved to nanotabpfn_plus.pt")
