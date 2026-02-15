# Quick Start Guide

## Prerequisites

- **Python 3.8+** (for backend)
- **Node.js 18+** and npm (for frontend)

## Run the App (2 terminals)

### Terminal 1 – Backend
```powershell
cd backend
pip install -r requirements.txt
python app.py
```
Backend runs at **http://localhost:5000**

### Terminal 2 – Frontend
```powershell
cd frontend
npm install
npm start
```
Frontend runs at **http://localhost:3000**

## Verify

1. Backend: Open http://localhost:5000 – you should see `{"status":"ok","message":"Airline Trends API"}`
2. Frontend: Open http://localhost:3000 – you should see the Airline Market Demand Trends app
3. Select a route from the dropdown and view price trends
4. Use the "Market Insights" tab for top routes and demand periods

## Build for Production

```powershell
cd frontend
npm run build
```
Output will be in `frontend/build/` – ready for deployment.
