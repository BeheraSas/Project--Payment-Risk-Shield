// src/App.js
import React, { useState } from 'react';
import FormComponent from './components/FormComponent';
import PredictionComponent from './components/PredictionComponent';
import './App.css';
import logo from './assets/logo.png'; // Import the logo image

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
        resolve({ is_fraud: Math.random() > 0.5 });
      }, 1000);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" className="App-logo" />
        <h1>Payment Risk Shield </h1>
      </header>
      <FormComponent onSubmit={handleFormSubmit} />
      {result !== null && <PredictionComponent result={result} />}
    </div>
  );
}

export default App;
