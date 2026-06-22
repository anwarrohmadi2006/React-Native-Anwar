"""Quick start: classification example."""
import numpy as np
import torch
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, roc_auc_score
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from model import NanoTabPFNPlusModel
from inference import TabPFN3Classifier

# ── Data ──────────────────────────────────────────────────────────────
X, y = load_breast_cancer(return_X_y=True)
X = X.astype(np.float32)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=42)

# ── Model (random weights for demo) ───────────────────────────────────
model = NanoTabPFNPlusModel(
    embedding_size=64,
    num_attention_heads=4,
    mlp_hidden_size=128,
    num_layers=3,
    num_outputs=2,
    max_features=100,
    max_classes=4,
)

# ── Classifier ────────────────────────────────────────────────────────
device = 'cuda' if torch.cuda.is_available() else 'cpu'
classifier = TabPFN3Classifier(
    model,
    device=device,
    n_ensemble=4,       # small ensemble for quick demo
    use_kv_cache=True,
)

classifier.fit(X_train, y_train)
probs = classifier.predict_proba(X_test)   # (N_test, 2)
preds = classifier.predict(X_test)          # (N_test,)

acc = accuracy_score(y_test, preds)
auc = roc_auc_score(y_test, probs[:, 1])
print(f"Breast Cancer | Accuracy: {acc:.4f} | ROC-AUC: {auc:.4f}")
print(f"(Note: model has random weights — train first with train.py for real results)")
