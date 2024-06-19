// src/App.js
import React, { useState } from "react";
import FormComponent from "./components/FormComponent";
import PredictionComponent from "./components/PredictionComponent";
import "./App.css";
import logo from "./assets/logo.png"; // Import the logo image
import PhishingURLDetector from "./components/PhishingURLDetector.component";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.component";
import { Flex } from "antd";

function App() {
  const [result, setResult] = useState(null);

  const handleFormSubmit = async (formData) => {
    // Simulate API call for fraud detection
    const response = await fakeApiCall(formData);
    setResult(response.is_fraud);
  };

  const fakeApiCall = async (data) => {
    // Simulated response from an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          is_fraud: Math.random() > 0.5,
        });
      }, 1000);
    });
  };

  return (
    <div className="App flex flex-col justify-center items-center min-h-svh">
      <Flex gap={2} align="center" justify="center">
        <img src={logo} alt="Logo" className="w-20 h-20" />
        <h1 className="text-6xl"> Payment Risk Shield </h1>{" "}
      </Flex>
      {/* <header className="App-header">
        
      </header>{" "}
      <FormComponent onSubmit={handleFormSubmit} />{" "}
      {result !== null && <PredictionComponent result={result} />}{" "} */}
      {/* <PhishingURLDetector /> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/fraudDetector"
            element={<FormComponent onSubmit={handleFormSubmit} />}
          />
          <Route exact path="/phisingUrlDetector" element={<PhishingURLDetector />} />
        </Routes>
      </BrowserRouter>
      {/* <Home /> */}
    </div>
  );
}

export default App;
