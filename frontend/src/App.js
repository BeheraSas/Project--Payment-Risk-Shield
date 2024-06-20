import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import FormComponent from './components/FormComponent';
import PredictionComponent from './components/PredictionComponent';
import './App.css';
import logo from './assets/logo.png'; // Correct import path

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
            <Route path="/phishing-detection" element={<PlaceholderComponent />} />
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

const PlaceholderComponent = () => (
  <div>
    <h2>Phishing Detection Page Coming Soon!</h2>
    <p>This feature is under development.</p>
  </div>
);

export default App;
