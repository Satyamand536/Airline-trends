#!/usr/bin/env bash
# Fullstack build script for Render deployment
set -e

echo "=== Installing Python dependencies ==="
pip install -r backend/requirements.txt

echo "=== Installing Node dependencies ==="
cd frontend && npm ci && cd ..

echo "=== Building React frontend ==="
cd frontend && npm run build && cd ..

echo "=== Build complete ==="
ls -la frontend/build/
