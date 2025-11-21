from flask import Flask, request, render_template, flash, redirect, url_for, send_file, jsonify, session
import os
import pandas as pd
import json
import numpy as np
from werkzeug.utils import secure_filename
from decode import checkType  # Assuming checkType handles conversion
from csv_parse import fill_missing_values
from math import ceil
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key'
app.config['SESSION_TYPE'] = 'filesystem'

UPLOAD_FOLDER = "uploads"
CSV_FOLDER = "csv"  # Storing converted CSV files in root/csv
ROWS_PER_PAGE = 100

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CSV_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CSV_FOLDER'] = CSV_FOLDER

def clear_directories():
    """Deletes all files in uploads and csv folders before processing a new file."""
    for folder in [UPLOAD_FOLDER, CSV_FOLDER]:
        for filename in os.listdir(folder):
            file_path = os.path.join(folder, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)  # Delete files and links
            except Exception as e:
                print(f"Failed to delete {file_path}: {e}")

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        clear_directories()  # Clean directories before saving the new file

        if 'file' not in request.files:
            flash("No file part", "error")
            return redirect(request.url)
        
        file = request.files['file']
        if file.filename == '':
            flash("No selected file", "error")
            return redirect(request.url)
        
        if file:
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            
            output_path = os.path.join(app.config['CSV_FOLDER'])
            os.makedirs(output_path, exist_ok=True)
            
            result = checkType(file_path, output_path, "")

            csv_output_file = f"{output_path}/{filename}_output.csv"
            fill_missing_values(csv_output_file, CSV_FOLDER)
            
            flash(f"File successfully converted and saved at {csv_output_file}", "success")
            return redirect(url_for('dashboard'))
    
    return render_template('index.html')

# @app.route('/view_csv')
# def view_csv():
#     """Displays the most recent CSV file as a DataFrame without extra newlines."""
#     files = [f for f in os.listdir(CSV_FOLDER) if f.endswith('.csv')]
    
#     if not files:
#         flash("No CSV file available to display.", "error")
#         return redirect(url_for('upload_file'))
    
#     latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(CSV_FOLDER, f)))
#     csv_path = os.path.join(CSV_FOLDER, latest_file)
    
#     df = pd.read_csv(csv_path, engine="python").fillna("")  # Replace NaN with empty strings
#     table_html = df.to_html(classes='table table-striped', index=False, escape=False)
    
#     return render_template('view_csv.html', table=table_html, title="CSV Preview")


@app.route('/view_csv')
def view_csv():
    """Displays the most recent CSV file as a paginated DataFrame."""
    files = [f for f in os.listdir(CSV_FOLDER) if f.endswith('.csv')]
    
    if not files:
        flash("No CSV file available to display.", "error")
        return redirect(url_for('upload_file'))
    
    latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(CSV_FOLDER, f)))
    csv_path = os.path.join(CSV_FOLDER, latest_file)
    
    df = pd.read_csv(csv_path, engine="python").fillna("")  # Replace NaN with empty strings
    total_rows = len(df)
    
    # Get current page number from request arguments, default to 1
    page = request.args.get('page', 1, type=int)
    
    # Calculate start and end row indices for pagination
    start_idx = (page - 1) * ROWS_PER_PAGE
    end_idx = start_idx + ROWS_PER_PAGE

    # Slice DataFrame for the current page
    df_paginated = df.iloc[start_idx:end_idx]

    # Convert DataFrame to HTML
    table_html = df_paginated.to_html(classes='table table-striped', index=False, escape=False)

    return render_template(
        'view_csv.html', 
        table=table_html, 
        title="CSV Preview", 
        page=page, 
        total_pages=ceil(total_rows / ROWS_PER_PAGE)
    )


@app.route('/api/data')
def get_data():
    """Serves the latest CSV data as JSON"""
    files = [f for f in os.listdir(CSV_FOLDER) if f.endswith('.csv')]
    
    if not files:
        return jsonify({"error": "No data available"}), 404
    
    latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(CSV_FOLDER, f)))
    csv_path = os.path.join(CSV_FOLDER, latest_file)
    
    df = pd.read_csv(csv_path).fillna(0)

    # Convert relevant columns to JSON
    data = {
        "latitude": df["latitude"].tolist(),
        "longitude": df["longitude"].tolist(),
        "battery": df["percentageCapacity"].tolist(),
        "altitude": df["altitude"].tolist(),
        "velN": df["velN"].tolist(),
        "velE": df["velE"].tolist(),
        "velD": df["velD"].tolist(),
        "gyroX": df["gyroX"].tolist(),
        "gyroY": df["gyroY"].tolist(),
        "gyroZ": df["gyroZ"].tolist(),
        "gimbal_roll": df["Gimbal:roll"].tolist(),
        "gimbal_pitch": df["Gimbal:pitch"].tolist(),
        "gimbal_yaw": df["Gimbal:yaw"].tolist(),
        "current": df["current"].tolist(),
        "voltage": df[["volt1", "volt2", "volt3", "volt4", "volt5", "volt6"]].to_dict(orient='list'),
        "temperature": df["batteryTemp(C)"].tolist()
    }
    
    return jsonify(data)


@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/export/csv')
def export_csv():
    """Export the current CSV file as a downloadable CSV"""
    files = [f for f in os.listdir(CSV_FOLDER) if f.endswith('.csv')]
    
    if not files:
        flash("No CSV file available to export.", "error")
        return redirect(url_for('upload_file'))
    
    latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(CSV_FOLDER, f)))
    csv_path = os.path.join(CSV_FOLDER, latest_file)
    
    return send_file(csv_path, as_attachment=True, download_name=latest_file)

@app.route('/export/json')
def export_json():
    """Export the current CSV data as JSON"""
    files = [f for f in os.listdir(CSV_FOLDER) if f.endswith('.csv')]
    
    if not files:
        flash("No CSV file available to export.", "error")
        return redirect(url_for('upload_file'))
    
    latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(CSV_FOLDER, f)))
    csv_path = os.path.join(CSV_FOLDER, latest_file)
    
    df = pd.read_csv(csv_path).fillna(0)
    json_data = df.to_dict(orient='records')
    
    json_filename = latest_file.replace('.csv', '.json')
    
    return jsonify(json_data), 200, {'Content-Type': 'application/json', 
                                     'Content-Disposition': f'attachment; filename={json_filename}'}

@app.route('/api/statistics')
def get_statistics():
    """Get comprehensive flight statistics"""
    files = [f for f in os.listdir(CSV_FOLDER) if f.endswith('.csv')]
    
    if not files:
        return jsonify({"error": "No data available"}), 404
    
    latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(CSV_FOLDER, f)))
    csv_path = os.path.join(CSV_FOLDER, latest_file)
    
    df = pd.read_csv(csv_path).fillna(0)
    
    stats = {
        "overview": {
            "total_data_points": len(df),
            "flight_duration_seconds": len(df),
            "max_altitude": float(df["altitude"].max()) if "altitude" in df.columns else 0,
            "min_altitude": float(df["altitude"].min()) if "altitude" in df.columns else 0,
            "max_battery": float(df["percentageCapacity"].max()) if "percentageCapacity" in df.columns else 0,
            "min_battery": float(df["percentageCapacity"].min()) if "percentageCapacity" in df.columns else 0,
            "start_battery": float(df["percentageCapacity"].iloc[0]) if "percentageCapacity" in df.columns else 0,
            "end_battery": float(df["percentageCapacity"].iloc[-1]) if "percentageCapacity" in df.columns else 0,
            "battery_drop": float(df["percentageCapacity"].iloc[0] - df["percentageCapacity"].iloc[-1]) if "percentageCapacity" in df.columns else 0
        },
        "gps": {
            "total_distance_km": 0,
            "max_speed_mps": 0,
            "avg_speed_mps": 0,
            "start_lat": float(df["latitude"].iloc[0]) if "latitude" in df.columns else 0,
            "start_lon": float(df["longitude"].iloc[0]) if "longitude" in df.columns else 0,
            "end_lat": float(df["latitude"].iloc[-1]) if "latitude" in df.columns else 0,
            "end_lon": float(df["longitude"].iloc[-1]) if "longitude" in df.columns else 0
        },
        "battery": {
            "avg_voltage": 0,
            "min_voltage": 0,
            "max_current": 0,
            "avg_current": 0,
            "max_temp": float(df["batteryTemp(C)"].max()) if "batteryTemp(C)" in df.columns else 0,
            "min_temp": float(df["batteryTemp(C)"].min()) if "batteryTemp(C)" in df.columns else 0,
            "avg_temp": float(df["batteryTemp(C)"].mean()) if "batteryTemp(C)" in df.columns else 0
        },
        "anomalies": []
    }
    
    # Calculate distance
    if "latitude" in df.columns and "longitude" in df.columns:
        from math import radians, cos, sin, asin, sqrt
        def haversine(lon1, lat1, lon2, lat2):
            lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
            dlon = lon2 - lon1
            dlat = lat2 - lat1
            a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
            return 2 * asin(sqrt(a)) * 6371  # Radius of earth in kilometers
        
        total_distance = 0
        for i in range(len(df) - 1):
            total_distance += haversine(
                df["longitude"].iloc[i], df["latitude"].iloc[i],
                df["longitude"].iloc[i+1], df["latitude"].iloc[i+1]
            )
        stats["gps"]["total_distance_km"] = round(total_distance, 2)
    
    # Calculate speeds
    if all(col in df.columns for col in ["velN", "velE", "velD"]):
        speeds = np.sqrt(df["velN"]**2 + df["velE"]**2 + df["velD"]**2)
        stats["gps"]["max_speed_mps"] = float(speeds.max())
        stats["gps"]["avg_speed_mps"] = float(speeds.mean())
    
    # Battery voltage
    if any(f"volt{i}" in df.columns for i in range(1, 7)):
        voltages = []
        for i in range(1, 7):
            if f"volt{i}" in df.columns:
                voltages.append(df[f"volt{i}"].mean())
        if voltages:
            stats["battery"]["avg_voltage"] = round(sum(voltages) / len(voltages), 2)
            stats["battery"]["min_voltage"] = round(min([df[f"volt{i}"].min() for i in range(1, 7) if f"volt{i}" in df.columns]), 2)
    
    # Current
    if "current" in df.columns:
        stats["battery"]["max_current"] = float(df["current"].max())
        stats["battery"]["avg_current"] = float(df["current"].mean())
    
    # Detect anomalies
    anomalies = []
    
    # Battery anomalies
    if "percentageCapacity" in df.columns:
        if stats["overview"]["min_battery"] < 20:
            anomalies.append({"type": "warning", "message": f"Battery dropped critically low: {stats['overview']['min_battery']:.1f}%", "severity": "high"})
    
    # Temperature anomalies
    if "batteryTemp(C)" in df.columns:
        if stats["battery"]["max_temp"] > 50:
            anomalies.append({"type": "temperature", "message": f"Battery temperature exceeded 50°C: {stats['battery']['max_temp']:.1f}°C", "severity": "high"})
    
    # Speed anomalies
    if stats["gps"]["max_speed_mps"] > 20:
        anomalies.append({"type": "speed", "message": f"High speed detected: {stats['gps']['max_speed_mps']:.2f} m/s", "severity": "medium"})
    
    # Battery voltage anomalies
    if "volt1" in df.columns:
        voltage_data = [df[f"volt{i}"].min() for i in range(1, 7) if f"volt{i}" in df.columns]
        min_voltage = min(voltage_data) if voltage_data else 0
        if min_voltage < 3.3 and min_voltage > 0:
            anomalies.append({"type": "voltage", "message": f"Low voltage detected: {min_voltage:.2f}V", "severity": "high"})
    
    stats["anomalies"] = anomalies
    
    return jsonify(stats)

@app.route('/flight-statistics')
def flight_statistics():
    """Render the flight statistics page"""
    return render_template('flight_statistics.html')

@app.route('/api/search')
def search_data():
    """Search through CSV data"""
    files = [f for f in os.listdir(CSV_FOLDER) if f.endswith('.csv')]
    
    if not files:
        return jsonify({"error": "No data available"}), 404
    
    latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(CSV_FOLDER, f)))
    csv_path = os.path.join(CSV_FOLDER, latest_file)
    
    df = pd.read_csv(csv_path).fillna("")
    
    query = request.args.get('q', '').lower()
    column = request.args.get('column', '')
    
    if query:
        # Search in specified column or all columns
        if column and column in df.columns:
            mask = df[column].astype(str).str.lower().str.contains(query, na=False)
            results = df[mask].to_dict(orient='records')
        else:
            # Search all columns
            mask = pd.Series([False] * len(df))
            for col in df.columns:
                mask |= df[col].astype(str).str.lower().str.contains(query, na=False)
            results = df[mask].to_dict(orient='records')
    else:
        results = df.head(100).to_dict(orient='records')
    
    return jsonify({
        "data": results,
        "total_results": len(results),
        "columns": list(df.columns)
    })

@app.route('/export/kml')
def export_kml():
    """Export flight path as KML for Google Earth"""
    files = [f for f in os.listdir(CSV_FOLDER) if f.endswith('.csv')]
    
    if not files:
        flash("No CSV file available to export.", "error")
        return redirect(url_for('upload_file'))
    
    latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(CSV_FOLDER, f)))
    csv_path = os.path.join(CSV_FOLDER, latest_file)
    
    df = pd.read_csv(csv_path)
    
    # Create KML content
    kml = """<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
    <Document>
        <name>Drone Flight Path</name>
        <Style id="flightPath">
            <LineStyle>
                <color>ff00fefe</color>
                <width>4</width>
            </LineStyle>
        </Style>
        <Placemark>
            <name>Flight Path</name>
            <styleUrl>#flightPath</styleUrl>
            <LineString>
                <altitudeMode>absolute</altitudeMode>
                <coordinates>
"""
    
    # Add coordinates
    if "latitude" in df.columns and "longitude" in df.columns and "altitude" in df.columns:
        for idx, row in df.iterrows():
            lon = row["longitude"]
            lat = row["latitude"]
            alt = row["altitude"] if "altitude" in df.columns else 0
            kml += f"                    {lon},{lat},{alt}\n"
    else:
        kml += "                    0,0,0\n"
    
    kml += """                </coordinates>
            </LineString>
        </Placemark>
    </Document>
</kml>
"""
    
    kml_filename = latest_file.replace('.csv', '.kml')
    
    # Save KML file temporarily
    kml_path = os.path.join(CSV_FOLDER, kml_filename)
    with open(kml_path, 'w') as f:
        f.write(kml)
    
    return send_file(kml_path, as_attachment=True, download_name=kml_filename)

@app.route('/api/flight-events')
def get_flight_events():
    """Detect flight events like hovering, climbing, descending"""
    files = [f for f in os.listdir(CSV_FOLDER) if f.endswith('.csv')]
    
    if not files:
        return jsonify({"error": "No data available"}), 404
    
    latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(CSV_FOLDER, f)))
    csv_path = os.path.join(CSV_FOLDER, latest_file)
    
    df = pd.read_csv(csv_path).fillna(0)
    
    events = []
    
    # Detect hovering (minimal movement)
    if "latitude" in df.columns and "longitude" in df.columns:
        # Calculate velocity magnitude
        if all(col in df.columns for col in ["velN", "velE", "velD"]):
            velocities = np.sqrt(df["velN"]**2 + df["velE"]**2 + df["velD"]**2)
            
            # Hovering: speed < 1 m/s
            hovering = velocities < 1.0
            hover_count = int(hovering.sum())
            if hover_count > 10:
                events.append({
                    "type": "hovering",
                    "duration": hover_count,
                    "message": f"Detected {hover_count} data points with speed < 1 m/s (hovering)"
                })
    
    # Detect rapid altitude changes
    if "altitude" in df.columns:
        altitude_change = df["altitude"].diff()
        
        # Rapid climb: > 2 m/s change
        rapid_climbs = (altitude_change > 2).sum()
        if rapid_climbs > 0:
            events.append({
                "type": "rapid_climb",
                "count": int(rapid_climbs),
                "message": f"Detected {rapid_climbs} rapid altitude gains"
            })
        
        # Rapid descent: < -2 m/s change
        rapid_descents = (altitude_change < -2).sum()
        if rapid_descents > 0:
            events.append({
                "type": "rapid_descent",
                "count": int(rapid_descents),
                "message": f"Detected {rapid_descents} rapid altitude losses"
            })
    
    # Detect voltage drops
    if "volt1" in df.columns:
        for i in range(1, 7):
            if f"volt{i}" in df.columns:
                volt_data = df[f"volt{i}"]
                voltage_drops = (volt_data.diff() < -0.1).sum()
                if voltage_drops > 0:
                    events.append({
                        "type": "voltage_spike",
                        "cell": i,
                        "count": int(voltage_drops),
                        "message": f"Cell {i}: Detected {voltage_drops} voltage drops"
                    })
    
    return jsonify(events)

@app.route('/api/enhanced-statistics')
def get_enhanced_statistics():
    """Get enhanced flight statistics with more details"""
    files = [f for f in os.listdir(CSV_FOLDER) if f.endswith('.csv')]
    
    if not files:
        return jsonify({"error": "No data available"}), 404
    
    latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(CSV_FOLDER, f)))
    csv_path = os.path.join(CSV_FOLDER, latest_file)
    
    df = pd.read_csv(csv_path).fillna(0)
    
    enhanced_stats = {
        "altitude_stats": {},
        "speed_stats": {},
        "battery_performance": {},
        "flight_phases": {}
    }
    
    # Altitude statistics
    if "altitude" in df.columns:
        altitudes = df["altitude"]
        enhanced_stats["altitude_stats"] = {
            "mean": float(altitudes.mean()),
            "std": float(altitudes.std()),
            "max_gain": float((altitudes.diff()).max()),
            "max_loss": float((altitudes.diff()).min()),
            "range": float(altitudes.max() - altitudes.min())
        }
    
    # Speed statistics
    if all(col in df.columns for col in ["velN", "velE", "velD"]):
        speeds = np.sqrt(df["velN"]**2 + df["velE"]**2 + df["velD"]**2)
        enhanced_stats["speed_stats"] = {
            "mean": float(speeds.mean()),
            "std": float(speeds.std()),
            "min": float(speeds.min()),
            "max": float(speeds.max()),
            "median": float(speeds.median())
        }
    
    # Battery performance
    if "percentageCapacity" in df.columns:
        battery = df["percentageCapacity"]
        battery_change = battery.diff()
        enhanced_stats["battery_performance"] = {
            "avg_consumption_rate": float(battery_change.mean()),
            "max_drop": float(battery_change.min()),
            "most_stable_period": float(battery_change.std())
        }
    
    # Flight phases detection
    if "altitude" in df.columns and all(col in df.columns for col in ["velN", "velE", "velD"]):
        velocities = np.sqrt(df["velN"]**2 + df["velE"]**2 + df["velD"]**2)
        
        # Takeoff phase: first 10% with increasing altitude
        takeoff_end = len(df) // 10
        if takeoff_end > 0:
            takeoff_alt_increase = float(df["altitude"].iloc[:takeoff_end].diff().sum())
        
        # Landing phase: last 10% with decreasing altitude
        landing_start = len(df) - (len(df) // 10)
        if landing_start < len(df):
            landing_alt_decrease = float(df["altitude"].iloc[landing_start:].diff().sum())
        
        # Hovering detection
        hovering_count = int((velocities < 1.0).sum())
        
        enhanced_stats["flight_phases"] = {
            "takeoff_increase": takeoff_alt_increase if takeoff_end > 0 else 0,
            "landing_decrease": landing_alt_decrease if landing_start < len(df) else 0,
            "hover_count": hovering_count,
            "active_flight_count": len(df) - hovering_count
        }
    
    return jsonify(enhanced_stats)

if __name__ == '__main__':
    app.run(debug=True)
