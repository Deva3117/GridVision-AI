from flask import Flask, jsonify
from flask_cors import CORS
from digital_twin import update
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Welcome to GridVision AI Backend"

@app.route("/dashboard")
def dashboard():
    data = update()

    return jsonify({
        "status": data["status"],
        "voltage": f'{data["voltage"]} kV',
        "current": f'{data["current"]} A',
        "frequency": f'{data["frequency"]} Hz',
        "temperature": f'{data["temperature"]}°C',
        "breaker3": data["breaker3"],
    })

if __name__ == "__main__":
    app.run(debug=True)
