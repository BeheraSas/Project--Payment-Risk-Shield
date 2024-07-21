from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return 'Welcome to the Payment Risk Shield API'

@app.route("/getTransactions", methods=['GET'])
def get_transaction():
    transactions = []
    if os.path.exists("transactions.json"):
        with open("transactions.json", "r") as file:
            try:
                transactions = json.load(file)
            except json.JSONDecodeError:
                transactions = []
    
    return jsonify({"transactions": transactions})

@app.route("/getMessages", methods=["GET"])
def get_messages():
    messages = []
    if os.path.exists("messages.json"):
        with open("messages.json", "r") as file:
            try:
                messages = json.load(file)
            except json.JSONDecodeError:
                messages = []

    return jsonify({"messages": messages})


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

@app.route('/saveMessage', methods=['POST'])
def save_message():
    message_data = request.json

    # Check if the file exists and create an empty list if it doesn't
    if not os.path.exists('messages.json'):
        with open('messages.json', 'w') as file:
            file.write('[]')

    # Load existing messages
    with open('messages.json', 'r') as file:
        try:
            messages = json.load(file)
        except json.JSONDecodeError:
            messages = []

    # Append new message to the list
    messages.append(message_data)

    # Write all messages back to the file
    with open('messages.json', 'w') as file:
        json.dump(messages, file, indent=2)
        file.write('\n')  # Ensure each JSON object is on a new line

    return jsonify({"message": "Message saved successfully"}), 200

if __name__ == '__main__':
    app.run(port=5001, debug=True)
