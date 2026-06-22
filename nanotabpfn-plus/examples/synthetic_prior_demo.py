"""Demo: visualize synthetic datasets from SyntheticTabularPrior."""
import numpy as np
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from prior import SyntheticTabularPrior

prior = SyntheticTabularPrior(
    max_rows=500,
    min_rows=50,
    max_cols=20,
    min_cols=2,
    num_classes=5,
    missing_rate=0.1,
    nonlinear_prob=0.5,
    regression_prob=0.3,
    seed=42,
)

print("Generating 5 synthetic datasets from SCM prior...")
for i, (X, y, task) in enumerate(prior.generate_batch(5)):
    n_missing = int(np.isnan(X).sum())
    n_classes = len(np.unique(y[~np.isnan(y)])) if task == 'classification' else 'N/A'
    print(f"  Dataset {i+1}: shape={X.shape}, task={task}, "
          f"n_missing={n_missing}, classes={n_classes}")
    if task == 'regression':
        print(f"    y range: [{y.min():.2f}, {y.max():.2f}]")
    else:
        counts = np.bincount(y.astype(int))
        print(f"    class counts: {dict(enumerate(counts))}")
