# Render Deployment Guide (Fullstack)

## Deploy karne ka tarika

1. **GitHub pe code push karo**
   ```bash
   git add .
   git commit -m "Ready for Render deploy"
   git push origin main
   ```

2. **Render.com pe jao** → [render.com](https://render.com) → Sign up / Login

3. **New Web Service** banao
   - GitHub repo connect karo
   - Repo select karo: `airline_trends`

4. **Settings** (render.yaml use ho raha hai, ya manually set karo):

   | Field | Value |
   |-------|-------|
   | **Build Command** | `pip install -r backend/requirements.txt && cd frontend && npm install && npm run build` |
   | **Start Command** | `gunicorn --chdir backend --bind 0.0.0.0:$PORT app:app` |
   | **Environment** | Python |

5. **Deploy** button dabao — build start hogi.

## Kya hota hai deploy pe

- **Build phase**: Python deps + npm install + React build
- **Start phase**: Gunicorn Flask app chalata hai
- **Single URL**: Same domain pe frontend + API dono — `/` pe React app, `/api/*` pe APIs

## Local test (production jaisa)

```bash
# Build frontend
cd frontend && npm run build && cd ..

# Run (backend folder se)
cd backend
pip install -r requirements.txt
gunicorn --bind 0.0.0.0:5000 app:app
```

Phir browser me `http://localhost:5000` kholo — full app dikhega.
