// src/components/CustomersHome.js
import React, { useEffect, useState } from "react";

const CustomersHome = () => {
  const [transactions, setTransactions] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      const url = "http://127.0.0.1:5001/getTransactions";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json["transactions"]);
        setTransactions(json["transactions"]);

        return json;
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchTransactions();
  }, []);

  useEffect(() => {
    async function fetchMessages() {
      const url = "http://127.0.0.1:5001/getMessages";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json["messages"]);
        setMessages(json["messages"]);

        return json;
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchMessages();
  }, []);
  return (
    <div className="w-full">
      {/* Add more customer-specific content here */}
      <h3 className="text-xl font-bold text-center">
        Customer Notification System
      </h3>
      <div className="flex gap-3 flex-col">
        {transactions.map((transaction) => {
          if (transaction["transactionStatus"] === "fraud") {
            return (
              <div class="max-w-full rounded overflow-hidden shadow-lg">
                <div class="px-6 py-4">
                  <div class="font-bold text-lg mb-2">
                    Transaction Verification Message
                  </div>
                  <p class="text-gray-700 text-base">
                    Your Purchase from {transaction["merchant"]} priced at{" "}
                    {transaction["amt"]} was flagged as Fraud by the bank please
                    verify if it was you.{" "}
                  </p>
                  <div className="flex gap-3 mt-4 justify-center">
                    <button class="bg-green-500 hover:bg-green-700 w-48 text-white font-bold py-1 px-2 rounded">
                      Yes
                    </button>
                    <button class="bg-red-500 hover:bg-red-700 w-48 text-white font-bold py-1 px-2 rounded">
                      No
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div class="max-w-full rounded overflow-hidden shadow-lg">
                <div class="px-6 py-4">
                  <div class="font-bold text-lg mb-2">
                    Transaction Confirmation Message
                  </div>
                  <p class="text-gray-700 text-base">
                    Your Purchase from {transaction["merchant"]} priced at{" "}
                    {transaction["amt"]} was successul. Thanks for the purchase.{" "}
                  </p>
                </div>
              </div>
            );
          }
        })}

        {messages.map((message) => {
          return (
            <div class="max-w-full rounded overflow-hidden shadow-lg">
              <div class="px-6 py-4">
                <div class="font-bold text-lg mb-2">Messages With Links</div>
                <p class="text-gray-700 text-base">{message["message"]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomersHome;
