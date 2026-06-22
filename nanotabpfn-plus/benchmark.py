"""benchmark.py — Compare nanoTabPFN-plus against standard baselines.

Baselines:
  - XGBoost
  - LightGBM
  - CatBoost
  - RandomForest
  - MLP (sklearn)
  - LogisticRegression (sklearn)

Datasets (from sklearn):
  - breast_cancer
  - wine
  - iris
  - digits (10-class)

Usage:
    python benchmark.py
    python benchmark.py --model-path nanotabpfn_plus.pt
"""

from __future__ import annotations

import argparse
import time
import numpy as np
import torch
from sklearn.datasets import load_breast_cancer, load_wine, load_iris, load_digits
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import accuracy_score, balanced_accuracy_score, roc_auc_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.linear_model import LogisticRegression

from model import NanoTabPFNPlusModel
from inference import TabPFN3Classifier


DATASETS = {
    'breast_cancer': load_breast_cancer(return_X_y=True),
    'wine':          load_wine(return_X_y=True),
    'iris':          load_iris(return_X_y=True),
    'digits':        load_digits(return_X_y=True),
}


def get_baselines() -> dict:
    baselines = {
        'RandomForest':        RandomForestClassifier(n_estimators=100, random_state=0, n_jobs=-1),
        'LogisticRegression':  LogisticRegression(max_iter=1000, random_state=0),
        'MLP':                 MLPClassifier(hidden_layer_sizes=(256, 128), max_iter=500, random_state=0),
    }
    try:
        from xgboost import XGBClassifier
        baselines['XGBoost'] = XGBClassifier(n_estimators=100, eval_metric='logloss',
                                              random_state=0, verbosity=0, n_jobs=-1)
    except ImportError:
        print('  [skip] XGBoost not installed')
    try:
        from lightgbm import LGBMClassifier
        baselines['LightGBM'] = LGBMClassifier(n_estimators=100, random_state=0,
                                                n_jobs=-1, verbose=-1)
    except ImportError:
        print('  [skip] LightGBM not installed')
    try:
        from catboost import CatBoostClassifier
        baselines['CatBoost'] = CatBoostClassifier(iterations=100, random_state=0,
                                                    verbose=False)
    except ImportError:
        print('  [skip] CatBoost not installed')
    return baselines


def evaluate_classifier(clf, X, y, n_splits: int = 5) -> dict:
    """Evaluate a classifier with stratified k-fold cross-validation."""
    skf = StratifiedKFold(n_splits=n_splits, shuffle=True, random_state=0)
    accs, baccs, aucs, times = [], [], [], []
    n_classes = len(np.unique(y))

    for train_idx, test_idx in skf.split(X, y):
        X_tr, X_te = X[train_idx], X[test_idx]
        y_tr, y_te = y[train_idx], y[test_idx]

        t0 = time.time()
        clf.fit(X_tr, y_tr)
        elapsed = time.time() - t0

        if hasattr(clf, 'predict_proba'):
            probs = clf.predict_proba(X_te)
        else:
            probs = None

        preds = clf.predict(X_te)
        accs.append(accuracy_score(y_te, preds))
        baccs.append(balanced_accuracy_score(y_te, preds))

        if probs is not None:
            try:
                auc_p = probs[:, 1] if n_classes == 2 else probs
                aucs.append(roc_auc_score(y_te, auc_p, multi_class='ovr'))
            except Exception:
                aucs.append(float('nan'))

        times.append(elapsed)

    return {
        'acc':          np.mean(accs),
        'balanced_acc': np.mean(baccs),
        'roc_auc':      np.mean(aucs) if aucs else float('nan'),
        'fit_time_s':   np.mean(times),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--model-path', type=str, default=None,
                        help='Path to saved model weights (.pt file)')
    parser.add_argument('--n-ensemble', type=int, default=8)
    parser.add_argument('--n-splits',   type=int, default=5)
    args = parser.parse_args()

    device = 'cuda' if torch.cuda.is_available() else 'cpu'

    # ── Build nanoTabPFN-plus model ─────────────────────────────────
    model = NanoTabPFNPlusModel(
        embedding_size=128,
        num_attention_heads=4,
        mlp_hidden_size=256,
        num_layers=4,
        num_outputs=10,
        max_features=500,
        max_classes=16,
    )
    if args.model_path:
        model.load_state_dict(torch.load(args.model_path, map_location=device))
        print(f'Loaded weights from {args.model_path}')
    else:
        print('WARNING: No model weights provided — using random weights (for testing only)')

    tabpfn_clf = TabPFN3Classifier(
        model, device=device, n_ensemble=args.n_ensemble, use_kv_cache=True
    )

    baselines = get_baselines()
    all_clfs  = {'nanoTabPFN-plus': tabpfn_clf, **baselines}

    print(f"\n{'='*70}")
    print(f"  nanoTabPFN-plus Benchmark | {args.n_splits}-fold CV | n_ensemble={args.n_ensemble}")
    print(f"{'='*70}")

    for ds_name, (X, y) in DATASETS.items():
        X = X.astype(np.float32)
        print(f"\nDataset: {ds_name} | shape: {X.shape} | classes: {len(np.unique(y))}")
        print(f"  {'Model':<22} {'Acc':>7} {'BalAcc':>8} {'ROC-AUC':>9} {'Time(s)':>9}")
        print(f"  {'-'*57}")

        for clf_name, clf in all_clfs.items():
            try:
                scores = evaluate_classifier(clf, X, y, n_splits=args.n_splits)
                print(
                    f"  {clf_name:<22} "
                    f"{scores['acc']:>7.4f} "
                    f"{scores['balanced_acc']:>8.4f} "
                    f"{scores['roc_auc']:>9.4f} "
                    f"{scores['fit_time_s']:>9.3f}s"
                )
            except Exception as e:
                print(f"  {clf_name:<22} ERROR: {e}")

    print(f"\n{'='*70}")
    print("Benchmark complete.")


if __name__ == '__main__':
    main()
