# nanoTabPFN-plus 🚀

> **Enhanced reimplementation of TabPFN** — upgraded from [nanoTabPFN](https://github.com/automl/nanoTabPFN) toward TabPFN-3.0 parity.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue)](https://python.org)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0%2B-orange)](https://pytorch.org)

## What is this?

`nanoTabPFN-plus` adalah reimplementasi edukatif dan fungsional TabPFN yang mengintegrasikan semua fitur utama TabPFN-3:

| Feature | nanoTabPFN (original) | **nanoTabPFN-plus** |
|---|---|---|
| Randomized Feature Tokens | ✗ | ✅ |
| NaN / Missing value handling | ✗ | ✅ |
| Regression support | ✗ | ✅ |
| Many-class (>10 classes) | ✗ | ✅ |
| Ensembling (n=32+) | ✗ | ✅ |
| KV Caching (faster inference) | ✗ | ✅ |
| Row chunking (scalable to 1M rows) | ✗ | ✅ |
| Temperature calibration | ✗ | ✅ |
| Feature subsampling (high-dim) | ✗ | ✅ |
| DAG-aware synthetic prior | Basic | ✅ SCM-based |
| Multi-task loss (classification + regression) | ✗ | ✅ |

## Architecture

```
Input (X_train, y_train, X_test)
        │
        ▼
┌─────────────────────────────────┐
│   RandomizedFeatureTokenEncoder │  ← NaN handling + per-feature tokens
│   AdvancedTargetEncoder         │  ← multi-class + regression + unknown token
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   CachedTransformerLayer × N    │  ← dual attention (row↔col) + KV cache
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   MultiTaskDecoder              │  ← classification / regression / calibration
└─────────────────────────────────┘
        │
        ▼
Predictions (probs / mean+std)
```

## Quick Start

```bash
pip install torch numpy scikit-learn networkx
```

```python
from model import NanoTabPFNPlusModel
from inference import TabPFN3Classifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

# Load data
X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5)

# Create model
model = NanoTabPFNPlusModel(
    embedding_size=128,
    num_attention_heads=4,
    mlp_hidden_size=256,
    num_layers=4,
    num_outputs=10,
    max_features=500
)

# Create classifier with ensembling
classifier = TabPFN3Classifier(model, device='cpu', n_ensemble=8)
classifier.fit(X_train, y_train)
probs = classifier.predict_proba(X_test)
preds = probs.argmax(axis=1)
```

## Training with Synthetic Prior

```python
from prior import SyntheticTabularPrior
from train import train

prior = SyntheticTabularPrior(
    max_rows=1000,
    max_cols=100,
    num_classes=10,
    missing_rate=0.1,
    nonlinear_prob=0.5
)

model, history = train(
    model=model,
    prior=prior,
    steps=5000,
    batch_size=16,
    lr=4e-3
)
```

## Files

| File | Description |
|---|---|
| `model.py` | Core architecture (encoders, transformer, decoder) |
| `inference.py` | Classifier & regressor with ensembling + chunking |
| `prior.py` | SCM-based synthetic dataset generator |
| `train.py` | Training loop with multi-task loss |
| `benchmark.py` | Evaluation against XGBoost, CatBoost, RandomForest |
| `examples/` | Usage examples |

## License

Apache 2.0 — bebas dipakai untuk proyek komersial maupun non-komersial.

## Citation

If you use this in research, please cite the original nanoTabPFN and TabPFN papers:

```bibtex
@article{hollmann2025tabpfn,
  title={Accurate predictions on small data with a tabular foundation model},
  author={Hollmann, Noah and M{\"u}ller, Samuel and Purucker, Lennart and others},
  journal={Nature},
  year={2025}
}
```

## Acknowledgements

Based on [nanoTabPFN](https://github.com/automl/nanoTabPFN) by AutoML Group Freiburg.
Upgraded toward [TabPFN-3](https://arxiv.org/abs/2605.13986) feature parity.
