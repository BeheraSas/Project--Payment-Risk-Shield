import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import FormComponent from './components/FormComponent';
import PredictionComponent from './components/PredictionComponent';
import PhishingURLDetector from './components/PhishingURLDetector.component'; 
import './App.css';
import logo from './assets/logo.png';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-left">
            <img src={logo} alt="Logo" className="logo" />
            <span className="app-title">Payment Risk Shield</span>
          </div>
          <div className="navbar-right">
            <Link to="/" className="nav-link">Credit Card Fraud Detection</Link>
            <Link to="/phishing-detection" className="nav-link">Phishing Detection</Link>
          </div>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<FraudDetectionPage />} />
            <Route path="/phishing-detection" element={<PhishingURLDetector />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const FraudDetectionPage = () => {
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
    <div>
      <FormComponent onSubmit={handleFormSubmit} />
      {result !== null && <PredictionComponent result={result} />}
    </div>
  );
};

export default App;
