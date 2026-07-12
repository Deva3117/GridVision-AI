from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Welcome to GridVision AI Backend"

@app.route("/dashboard")
def dashboard():

    data = {
        "status": "ONLINE",
        "voltage": "210 kV",
        "current": "580 A",
        "frequency": "50 Hz",
        "temperature": "36°C"
    }

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)