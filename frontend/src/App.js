// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CustomersHome from './components/CustomersHome';
import BankingHome from './components/BankingHome';
import MerchantHome from './components/MerchantHome';
import './App.css';
import TransactionMessage from './components/TransactionMessage';
import PhishingURLDetector from './components/PhishingURLDetector.component';
import PhishingURLDetectorBank from './components/PhishingURLDetectorBank'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<Login onLogin={login} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/customer-home/*" element={<CustomersHome />} />
              <Route path="/banking-home" element={<BankingHome />} />
              <Route path="/merchant-home/*" element={<MerchantHome />} />
            </>
          )}
          <Route path="/phishing-detection" element={<PhishingURLDetector />} />
          <Route path="/phishing-detection-bank" element={<PhishingURLDetectorBank />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
