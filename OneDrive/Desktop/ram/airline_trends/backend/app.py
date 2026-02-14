"""
Airline Market Demand Trends - Flask Backend
Serves mock airline route and price trend data for the React frontend.
In production, also serves the built React app as static files.
"""
import os
import random
from pathlib import Path
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Path to React build (when deployed)
BASE_DIR = Path(__file__).resolve().parent
STATIC_FOLDER = BASE_DIR.parent / 'frontend' / 'build'

app = Flask(__name__, static_folder=str(STATIC_FOLDER) if STATIC_FOLDER.exists() else None, static_url_path='')
CORS(app)

# Seed for reproducible (but varied) mock data
random.seed(42)

# International routes including Indian-origin routes
ROUTES = [
    {"id": "1", "origin": "New York", "destination": "London", "region": "Americas-Europe", "route_string": "NYC-LON"},
    {"id": "2", "origin": "Los Angeles", "destination": "Tokyo", "region": "Americas-Asia", "route_string": "LAX-NRT"},
    {"id": "3", "origin": "Chicago", "destination": "Paris", "region": "Americas-Europe", "route_string": "ORD-CDG"},
    {"id": "4", "origin": "Miami", "destination": "São Paulo", "region": "Americas", "route_string": "MIA-GRU"},
    {"id": "5", "origin": "San Francisco", "destination": "Singapore", "region": "Americas-Asia", "route_string": "SFO-SIN"},
    {"id": "6", "origin": "Dubai", "destination": "Mumbai", "region": "Middle East-Asia", "route_string": "DXB-BOM"},
    {"id": "7", "origin": "London", "destination": "Sydney", "region": "Europe-Oceania", "route_string": "LON-SYD"},
    {"id": "8", "origin": "Frankfurt", "destination": "Shanghai", "region": "Europe-Asia", "route_string": "FRA-PVG"},
    {"id": "9", "origin": "Amsterdam", "destination": "Bangkok", "region": "Europe-Asia", "route_string": "AMS-BKK"},
    {"id": "10", "origin": "Hong Kong", "destination": "New York", "region": "Asia-Americas", "route_string": "HKG-JFK"},
    {"id": "11", "origin": "Singapore", "destination": "London", "region": "Asia-Europe", "route_string": "SIN-LHR"},
    {"id": "12", "origin": "Tokyo", "destination": "Sydney", "region": "Asia-Oceania", "route_string": "NRT-SYD"},
    {"id": "13", "origin": "Toronto", "destination": "London", "region": "Americas-Europe", "route_string": "YYZ-LHR"},
    {"id": "14", "origin": "Paris", "destination": "Tokyo", "region": "Europe-Asia", "route_string": "CDG-NRT"},
    {"id": "15", "origin": "Seoul", "destination": "Los Angeles", "region": "Asia-Americas", "route_string": "ICN-LAX"},
    {"id": "16", "origin": "Sydney", "destination": "Los Angeles", "region": "Oceania-Americas", "route_string": "SYD-LAX"},
    {"id": "17", "origin": "Berlin", "destination": "New York", "region": "Europe-Americas", "route_string": "BER-JFK"},
    {"id": "18", "origin": "Dubai", "destination": "London", "region": "Middle East-Europe", "route_string": "DXB-LHR"},
    # Indian-origin international routes
    {"id": "19", "origin": "Delhi", "destination": "Dubai", "region": "Asia-Middle East", "route_string": "DEL-DXB"},
    {"id": "20", "origin": "Mumbai", "destination": "London", "region": "Asia-Europe", "route_string": "BOM-LHR"},
    {"id": "21", "origin": "Delhi", "destination": "Singapore", "region": "Asia", "route_string": "DEL-SIN"},
    {"id": "22", "origin": "Bengaluru", "destination": "New York", "region": "Asia-Americas", "route_string": "BLR-JFK"},
    {"id": "23", "origin": "Mumbai", "destination": "Paris", "region": "Asia-Europe", "route_string": "BOM-CDG"},
    {"id": "24", "origin": "Hyderabad", "destination": "Sydney", "region": "Asia-Oceania", "route_string": "HYD-SYD"},
    {"id": "25", "origin": "Delhi", "destination": "Tokyo", "region": "Asia", "route_string": "DEL-NRT"},
    {"id": "26", "origin": "Chennai", "destination": "Kuala Lumpur", "region": "Asia", "route_string": "MAA-KUL"},
]

# Month names for display
MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

# Peak demand months (higher prices): summer, holidays
PEAK_MONTHS = [0, 5, 6, 7, 11]  # Jan, Jun, Jul, Aug, Dec


def generate_price_trends(route_string: str) -> list:
    """Generate 12 months of price data with seasonality."""
    base_price = random.randint(400, 1200)
    trends = []
    for i in range(12):
        month_name = MONTHS[i]
        multiplier = 1.2 if i in PEAK_MONTHS else 0.9
        variance = random.uniform(0.85, 1.15)
        price = round(base_price * multiplier * variance)
        price = max(200, min(price, 2500))
        trends.append({"month": month_name, "price": price})
    return trends


def get_demand_category(avg_demand: float) -> str:
    """Convert numeric demand to category."""
    if avg_demand >= 4.0:
        return "High"
    if avg_demand >= 2.5:
        return "Medium"
    return "Low"


@app.route("/api/routes", methods=["GET"])
def get_routes():
    """Return all available airline routes."""
    return jsonify(ROUTES)


@app.route("/api/price-trends", methods=["GET"])
def get_price_trends():
    """Return monthly price trends for a given route."""
    route_str = request.args.get("route", "")
    if not route_str:
        return jsonify([])
    trends = generate_price_trends(route_str)
    return jsonify(trends)


def _build_insights_data():
    """Build insights data (shared by insights, popular-routes, demand-periods)."""
    popular_routes = []
    prices_for_volatility = []
    for r in ROUTES:
        avg_demand = round(random.uniform(2.5, 4.8), 1)
        avg_price = random.randint(500, 1500)
        prices_for_volatility.append(avg_price)
        popular_routes.append({
            "route": f"{r['origin']} → {r['destination']}",
            "demand_category": get_demand_category(avg_demand),
            "avg_demand": avg_demand,
            "avg_price": avg_price,
            "region": r["region"],
        })
    popular_routes.sort(key=lambda x: x["avg_demand"], reverse=True)

    demand_periods = []
    for m in MONTHS:
        avg_demand = round(random.uniform(2.8, 4.5), 1)
        demand_periods.append({
            "month": m,
            "avg_demand": avg_demand,
            "demand_category": get_demand_category(avg_demand),
        })
    demand_periods_sorted = sorted(demand_periods, key=lambda x: x["avg_demand"], reverse=True)

    high_demand_count = sum(1 for r in popular_routes if r["demand_category"] == "High")
    avg_price_val = round(
        sum(r["avg_price"] for r in popular_routes) / len(popular_routes)
    )
    # Price volatility: coefficient of variation (std/mean) as percentage
    mean_price = sum(prices_for_volatility) / len(prices_for_volatility)
    variance = sum((p - mean_price) ** 2 for p in prices_for_volatility) / len(prices_for_volatility)
    std_price = variance ** 0.5
    volatility_pct = round((std_price / mean_price) * 100) if mean_price else 0
    peak_month = demand_periods_sorted[0]["month"] if demand_periods_sorted else "N/A"
    most_popular = popular_routes[0]["route"] if popular_routes else "N/A"

    return {
        "summary": {
            "total_routes": len(ROUTES),
            "high_demand_routes": high_demand_count,
            "average_price": avg_price_val,
            "price_volatility_pct": volatility_pct,
            "peak_demand_month": peak_month,
            "most_popular_route": most_popular,
        },
        "popular_routes": popular_routes,
        "demand_periods": demand_periods_sorted,
    }


@app.route("/api/insights", methods=["GET"])
def get_insights():
    """Aggregated insights: summary, popular routes, demand periods."""
    return jsonify(_build_insights_data())


@app.route("/api/popular-routes", methods=["GET"])
def get_popular_routes():
    """Standalone popular routes (for API consistency)."""
    data = _build_insights_data()
    return jsonify(data["popular_routes"])


@app.route("/api/demand-periods", methods=["GET"])
def get_demand_periods():
    """Standalone demand periods (for API consistency)."""
    data = _build_insights_data()
    return jsonify(data["demand_periods"])


@app.route("/")
def index():
    """Serve React app or health check."""
    if STATIC_FOLDER.exists():
        return send_from_directory(STATIC_FOLDER, 'index.html')
    return jsonify({"status": "ok", "message": "Airline Trends API - Build frontend for full app"})


@app.route("/<path:path>")
def serve_static(path):
    """Serve React static files (JS, CSS, etc.) and fallback to index.html for SPA routing."""
    if not STATIC_FOLDER.exists():
        return jsonify({"error": "Frontend not built"}), 404
    if path.startswith('api'):
        return jsonify({"error": "Not found"}), 404
    file_path = STATIC_FOLDER / path
    if file_path.exists() and file_path.is_file():
        return send_from_directory(STATIC_FOLDER, path)
    return send_from_directory(STATIC_FOLDER, 'index.html')


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=os.environ.get('FLASK_ENV') == 'development', host='0.0.0.0', port=port)
