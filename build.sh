#!/usr/bin/env bash
# Exit on error
set -e

echo "Current Directory: $(pwd)"
echo "Directory Contents:"
ls -la

echo "Checking for backend directory..."
if [ -d "backend" ]; then
  echo "Backend directory found."
  ls -la backend
else
  echo "ERROR: Backend directory NOT found!"
  exit 1
fi

echo "Installing Python dependencies..."
pip install -r backend/requirements.txt

echo "Building Frontend..."
if [ -d "frontend" ]; then
  cd frontend
  npm install
  npm run build
  cd ..
else
  echo "ERROR: Frontend directory NOT found!"
  exit 1
fi

echo "Build Process Completed Successfully!"
