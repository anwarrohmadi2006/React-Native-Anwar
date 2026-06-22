"""Quick start: regression example."""
import numpy as np
import torch
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from model import NanoTabPFNPlusModel
from inference import TabPFN3Regressor

# ── Data ──────────────────────────────────────────────────────────────
X, y = load_diabetes(return_X_y=True)
X = X.astype(np.float32)
y = y.astype(np.float32)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=42)

# ── Model ─────────────────────────────────────────────────────────────
model = NanoTabPFNPlusModel(
    embedding_size=64,
    num_attention_heads=4,
    mlp_hidden_size=128,
    num_layers=3,
    num_outputs=10,
    max_features=100,
    max_classes=4,
)

device = 'cuda' if torch.cuda.is_available() else 'cpu'
regressor = TabPFN3Regressor(model, device=device, n_ensemble=4)

regressor.fit(X_train, y_train)
mu, sigma = regressor.predict(X_test)

rmse = mean_squared_error(y_test, mu) ** 0.5
r2   = r2_score(y_test, mu)
print(f"Diabetes | RMSE: {rmse:.2f} | R2: {r2:.4f}")
print(f"Prediction uncertainty (mean sigma): {sigma.mean():.2f}")
print(f"(Note: model has random weights — train first with train.py for real results)")
