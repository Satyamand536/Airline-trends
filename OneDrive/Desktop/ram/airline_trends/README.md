# Airline Market Demand Trends Web App

Hey there! 👋

This project is a fullstack web app that helps you (or your team) explore and monitor airline market demand trends. I built it using React for the frontend and Python Flask for the backend. Here's a walkthrough of how everything works, why I made certain choices, and how you can use or extend it for your own needs.

---

## What does this app do?

- Lets you select from a bunch of international airline routes (18+ major ones!)
- Shows you monthly price trends for each route, with a nice interactive chart
- Gives you insights like which routes are most popular, when demand is highest, and what the average prices look like
- All in a clean, modern, and responsive UI that works on your laptop or your phone

---

## How is it built?

### Backend (Flask)
- **No database needed**: All the data is generated on the fly (but you can easily plug in a real API or database later)
- **API endpoints**:
  - `/api/routes` — returns all available routes
  - `/api/price-trends?route=...` — returns monthly price and demand data for a selected route
  - `/api/popular-routes` — shows which routes are most in demand
  - `/api/demand-periods` — tells you which months are busiest overall
  - `/api/insights` — a summary of everything above, for dashboards
- **CORS enabled**: So the React frontend can talk to the backend without any headaches
- **Data**: The data is mock, but it's generated to look realistic, with seasonal demand, business/holiday routes, etc.

### Frontend (React)
- **Material-UI**: For a modern, consistent look and feel
- **Framer Motion**: For smooth animations and transitions
- **Chart.js (via react-chartjs-2)**: For the interactive line chart
- **Tabs**: You can switch between "Route Analysis" (pick a route, see the chart) and "Market Insights" (see top routes, high-demand months, etc.)
- **Responsive**: Works great on mobile and desktop
- **No coding needed to use**: Just open it in your browser and go

---

## How do I run it?

### 1. Backend (Flask)
- Open a terminal and go to the `backend` folder
- Install dependencies:
  ```bash
  pip install -r requirements.txt
  ```
- Start the server:
  ```bash
  python app.py
  ```
- The backend will run at [http://localhost:5000](http://localhost:5000)

### 2. Frontend (React)
- Open another terminal and go to the `frontend` folder
- Install dependencies:
  ```bash
  npm install
  ```
- Start the React app:
  ```bash
  npm start
  ```
- The frontend will run at [http://localhost:3000](http://localhost:3000)

---

## What's in the code?

### Backend
- `app.py`: All the Flask routes and data logic are here. The data is generated with some randomness and seasonality, so every time you restart, you might see slightly different prices and demand levels. If you want to plug in a real API or database, just swap out the data generation part.
- `requirements.txt`: Just Flask and Flask-CORS, nothing fancy.

### Frontend
- `src/components/Navbar.js`: The top bar with the app title and a little airplane icon. Has a nice animation when you load the page.
- `src/components/RouteSelector.js`: The dropdown where you pick your route. Routes are grouped by region, and you get a little chip showing the region too.
- `src/components/PriceTrendChart.js`: The main chart. It's interactive, animated, and shows min, max, and average prices for the selected route.
- `src/components/InsightsPanel.js`: This is the "Market Insights" tab. It shows summary cards, top popular routes, and which months are busiest, all with color-coded chips and smooth animations.
- `src/components/Footer.js`: The footer with a copyright, a tagline, and a spinning airplane icon if you hover.
- `src/App.js`: The main app. Handles tab switching, fetching data, and gluing everything together.
- `src/App.css`: Some custom styles for the overall look.

---

## How does the data work?

- **Routes**: There are 18 routes, covering all continents. Each has a region, so you can see trends by area.
- **Price trends**: For each route, you get 12 months of prices, with higher prices in peak months (holidays, summer, etc.).
- **Demand**: Each month has a demand level (1-5) and a category (Low, Medium, High). This is used to show which routes and months are hottest.
- **Insights**: The backend calculates which routes are most popular (by average demand) and which months are busiest overall.

---

## How can I extend or customize it?

- **Add real data**: Replace the mock data in `app.py` with data from an API or your own database.
- **Add more routes**: Just add to the `ROUTES` list and update the price generation logic.
- **Change the look**: Tweak the Material-UI theme in `App.js` or add your own styles in `App.css`.
- **Add user accounts**: You could add authentication and let users save favorite routes or get alerts.
- **Deploy it**: You can deploy the backend to Heroku/Railway and the frontend to Vercel/Netlify. Just update the API URLs in the frontend if you do.

---

## Why did I build it this way?

- I wanted something that's easy for anyone to use, not just developers.
- The mock data makes it easy to demo, but the structure is ready for real data.
- The UI is clean and modern, but not overwhelming.
- The code is organized so you can add features or swap out parts without breaking everything.

---

## Got questions or want to improve it?

If you want to add features, connect real data, or just have questions about how it works, feel free to reach out or fork the project. I'm always happy to help or see what others build on top of this!

---

Enjoy exploring airline market demand trends! ✈️
