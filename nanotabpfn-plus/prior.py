"""prior.py — SCM-based synthetic tabular dataset generator.

Generates datasets that closely mimic the statistical properties of real
tabular data using Structural Causal Models (SCM), the same approach used
to pretrain TabPFN.

Key features:
  - DAG-based causal structure between features and target
  - Linear + nonlinear (sin, tanh, polynomial) relationships
  - Configurable missing value patterns (MCAR, MAR)
  - Class imbalance simulation
  - Many-class support (up to max_classes)
  - Regression target support
  - Heterogeneous feature types (continuous + discrete)

Usage:
    prior = SyntheticTabularPrior(max_rows=1000, max_cols=50, num_classes=10)
    batch = prior.generate_batch(batch_size=32)
    # batch is list of (X, y, task) tuples
"""

from __future__ import annotations

import numpy as np
from typing import Literal


# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------

def _random_dag(n_nodes: int, edge_prob: float = 0.3) -> list[list[int]]:
    """Generate a random DAG (directed acyclic graph) over n_nodes.
    Returns adjacency list: parents[i] = list of parent indices for node i.
    """
    parents: list[list[int]] = [[] for _ in range(n_nodes)]
    for i in range(1, n_nodes):
        for j in range(i):
            if np.random.random() < edge_prob:
                parents[i].append(j)
    return parents


def _apply_nonlinearity(x: np.ndarray, kind: str) -> np.ndarray:
    """Apply a nonlinear transformation."""
    if kind == 'linear':      return x
    elif kind == 'sin':       return np.sin(x)
    elif kind == 'tanh':      return np.tanh(x)
    elif kind == 'square':    return np.sign(x) * (x ** 2)
    elif kind == 'abs':       return np.abs(x)
    elif kind == 'step':      return (x > 0).astype(float)
    elif kind == 'softplus':  return np.log1p(np.exp(np.clip(x, -20, 20)))
    else:                     return x


NONLINEARITIES = ['linear', 'sin', 'tanh', 'square', 'abs', 'step', 'softplus']


# ---------------------------------------------------------------------------
# Main prior class
# ---------------------------------------------------------------------------

class SyntheticTabularPrior:
    """Generates batches of synthetic tabular datasets using SCM priors.

    Args:
        max_rows:      Maximum rows per generated dataset.
        min_rows:      Minimum rows per generated dataset.
        max_cols:      Maximum feature columns per dataset.
        min_cols:      Minimum feature columns per dataset.
        num_classes:   Max number of classes for classification.
        missing_rate:  Probability of introducing missing values (0 = none).
        missing_type:  'mcar' (missing completely at random) or 'mar'
                       (missing at random, depends on another feature).
        nonlinear_prob:Probability each SCM node uses a nonlinear function.
        regression_prob: Probability that a generated task is regression.
        imbalance_prob:  Probability of applying class imbalance.
        noise_std:     Standard deviation of Gaussian noise added to each node.
        seed:          Random seed (None for random).
    """

    def __init__(
        self,
        max_rows:        int   = 1000,
        min_rows:        int   = 10,
        max_cols:        int   = 100,
        min_cols:        int   = 2,
        num_classes:     int   = 10,
        missing_rate:    float = 0.1,
        missing_type:    Literal['mcar', 'mar'] = 'mcar',
        nonlinear_prob:  float = 0.5,
        regression_prob: float = 0.3,
        imbalance_prob:  float = 0.3,
        noise_std:       float = 0.1,
        seed:            int | None = None,
    ):
        self.max_rows        = max_rows
        self.min_rows        = min_rows
        self.max_cols        = max_cols
        self.min_cols        = min_cols
        self.num_classes     = num_classes
        self.missing_rate    = missing_rate
        self.missing_type    = missing_type
        self.nonlinear_prob  = nonlinear_prob
        self.regression_prob = regression_prob
        self.imbalance_prob  = imbalance_prob
        self.noise_std       = noise_std
        if seed is not None:
            np.random.seed(seed)

    # ------------------------------------------------------------------
    def generate_dataset(
        self,
    ) -> tuple[np.ndarray, np.ndarray, str]:
        """Generate a single synthetic tabular dataset.

        Returns:
            X:    (n, d) float32 feature matrix (may contain NaN)
            y:    (n,) float32 (classification: int labels; regression: floats)
            task: 'classification' or 'regression'
        """
        n = np.random.randint(self.min_rows, self.max_rows + 1)
        d = np.random.randint(self.min_cols, self.max_cols + 1)
        task = 'regression' if np.random.random() < self.regression_prob else 'classification'
        n_classes = np.random.randint(2, self.num_classes + 1) if task == 'classification' else 1

        # ── Build SCM over d+1 nodes (d features + 1 target) ──────────
        n_nodes = d + 1
        parents = _random_dag(n_nodes, edge_prob=0.3)

        node_values = np.zeros((n, n_nodes), dtype=np.float32)

        for i in range(n_nodes):
            # Base noise
            node_val = np.random.normal(0, 1, size=n).astype(np.float32)

            if parents[i]:
                # Combine parent values
                parent_vals = sum(node_values[:, j] for j in parents[i])
                parent_vals /= (len(parents[i]) ** 0.5 + 1e-8)

                # Random coefficient
                coef = np.random.uniform(0.5, 2.0) * np.random.choice([-1, 1])

                # Apply nonlinearity
                nl_kind = np.random.choice(NONLINEARITIES) if np.random.random() < self.nonlinear_prob else 'linear'
                transformed = _apply_nonlinearity(parent_vals, nl_kind).astype(np.float32)

                node_val = node_val * self.noise_std + coef * transformed

            node_values[:, i] = node_val

        X = node_values[:, :d].copy()    # (n, d)
        y_raw = node_values[:, d].copy() # (n,)

        # ── Construct target ──────────────────────────────────────────
        if task == 'classification':
            # Partition y_raw into n_classes based on quantiles
            if n_classes == 2 and np.random.random() < self.imbalance_prob:
                # Imbalanced binary
                threshold = np.percentile(y_raw, np.random.uniform(60, 90))
                y = (y_raw > threshold).astype(np.float32)
            else:
                quantiles = np.linspace(0, 100, n_classes + 1)[1:-1]
                thresholds = np.percentile(y_raw, quantiles)
                y = np.digitize(y_raw, thresholds).astype(np.float32)
        else:  # regression
            # Normalize target
            mu  = y_raw.mean()
            std = y_raw.std() + 1e-8
            y   = ((y_raw - mu) / std).astype(np.float32)

        # ── Add missing values ────────────────────────────────────────
        if self.missing_rate > 0:
            X = self._add_missing(X)

        return X, y, task

    # ------------------------------------------------------------------
    def generate_batch(
        self,
        batch_size: int = 16,
    ) -> list[tuple[np.ndarray, np.ndarray, str]]:
        """Generate a batch of synthetic datasets with the SAME task.

        Args:
            batch_size: Number of datasets to generate.
        Returns:
            List of (X, y, task) tuples.
        """
        task = 'regression' if np.random.random() < self.regression_prob else 'classification'
        batch = []
        while len(batch) < batch_size:
            ds = self.generate_dataset()
            if ds[2] == task:
                batch.append(ds)
        return batch

    # ------------------------------------------------------------------
    def _add_missing(self, X: np.ndarray) -> np.ndarray:
        """Introduce missing values into feature matrix."""
        X = X.copy()
        n, d = X.shape
        if self.missing_type == 'mcar':
            # Missing Completely At Random
            mask = np.random.random((n, d)) < self.missing_rate
            X[mask] = np.nan
        elif self.missing_type == 'mar':
            # Missing At Random: missingness depends on another column
            for col in range(d):
                if np.random.random() < self.missing_rate:
                    ref_col = np.random.randint(0, d)
                    threshold = np.nanmedian(X[:, ref_col])
                    missing_rows = X[:, ref_col] > threshold
                    # Apply with some probability to avoid all-missing
                    mask = missing_rows & (np.random.random(n) < 0.5)
                    X[mask, col] = np.nan
        return X
