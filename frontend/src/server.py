from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return 'Welcome to the Payment Risk Shield API'

@app.route('/saveTransaction', methods=['POST'])
def save_transaction():
    transaction = request.json
    transactions = []

    if os.path.exists('transactions.json'):
        with open('transactions.json', 'r') as file:
            try:
                transactions = json.load(file)
            except json.JSONDecodeError:
                transactions = []

    transactions.append(transaction)

    with open('transactions.json', 'w') as file:
        json.dump(transactions, file, indent=2)

    return jsonify({"message": "Transaction saved successfully"}), 200

if __name__ == '__main__':
    app.run(port=5001, debug=True)
