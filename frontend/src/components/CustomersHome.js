import React, { useEffect, useState } from "react";
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Button } from "antd";

const CustomersHome = () => {
  const [transactions, setTransactions] = useState([]);
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate(); // Initialize navigate


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

  const handleUpdateStatus = async (trans_date_trans_time, status) => {
    const url = "http://127.0.0.1:5001/updateTransactionStatus";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trans_date_trans_time,
          status,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
  
      // Update the local state to reflect the status change
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.trans_date_trans_time === trans_date_trans_time
            ? { ...transaction, transactionStatus: status }
            : transaction
        )
      );
  
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };
  

  return (
    <div className="w-full">
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
          <span className="app-title">Payment Risk Shield</span>
        </div>
        <div className='ml-auto'>
          <Button onClick={() => navigate('/phishing-detection')}>Phishing Detection</Button>
        </div>
      </nav>
      {/* Add more customer-specific content here */}
      <h3 className="text-xl font-bold text-center">
        Customer Notification System
      </h3>
      <div className="flex gap-3 flex-col mr-5 ml-5">
        {transactions.map((transaction) => {
          if (transaction.userStatus) {
            return (
              <div key={transaction.trans_date_trans_time} className="max-w-full rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  {transaction.userStatus === "verified" ? (
                    <>
                      <div className="font-bold text-lg mb-2">
                        Transaction successful
                      </div>
                      <p className="text-gray-700 text-base">
                        Your Purchase from {transaction["merchant"]} priced at{" "}
                        {transaction["amt"]} was successful. Thanks for the purchase.{" "}
                      </p>
                      <p>You verified this transaction</p>
                    </>
                  ) : (
                    <>
                      <div className="font-bold text-lg mb-2">
                        Transaction cancelled
                      </div>
                      <p className="text-gray-700 text-base">
                        Your Purchase from {transaction["merchant"]} priced at{" "}
                        {transaction["amt"]} was cancelled.
                      </p>
                      <p>You cancelled this transaction</p>
                    </>
                  )}
                </div>
              </div>
            );
          }
          else if (transaction["transactionStatus"] === "fraud") {
            return (
              <div key={transaction.trans_date_trans_time} className="max-w-full rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="font-bold text-lg mb-2">
                    Transaction Verification Message
                  </div>
                  <p className="text-gray-700 text-base">
                    Your Purchase from {transaction["merchant"]} priced at{" "}
                    {transaction["amt"]} was flagged as Fraud by the bank please
                    verify if it was you.{" "}
                  </p>
                  <div className="flex gap-3 mt-4 justify-center">
                    <button
                      onClick={() => handleUpdateStatus(transaction.trans_date_trans_time, "verified")}
                      className="bg-green-500 hover:bg-green-700 w-48 text-white font-bold py-1 px-2 rounded"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(transaction.trans_date_trans_time, "cancelled")}
                      className="bg-red-500 hover:bg-red-700 w-48 text-white font-bold py-1 px-2 rounded"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={transaction.trans_date_trans_time} className="max-w-full rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="font-bold text-lg mb-2">
                    Transaction Confirmation Message
                  </div>
                  <p className="text-gray-700 text-base">
                    Your Purchase from {transaction["merchant"]} priced at{" "}
                    {transaction["amt"]} was successful. Thanks for the purchase.{" "}
                  </p>
                </div>
              </div>
            );
          }
        })}

        {messages.map((message) => {
          return (
            <div key={message["id"]} className="max-w-full rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-lg mb-2">Messages With Links</div>
                <p className="text-gray-700 text-base">{message["message"]}</p>
                <div className="flex gap-3 mt-4 justify-center">
                  <a
                    href={`http://localhost:3000/phishing-detection?search=${message["url"]}`}
                    className="bg-blue-500 hover:bg-blue-700 w-48 text-white font-bold py-1 px-2 rounded text-center no-underline"
                  >
                    Check Phishing
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomersHome;
