// src/components/CustomerHome.js
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import FraudDetectionPage from './FormComponent';
import PhishingURLDetector from './PhishingURLDetector.component';
import logo from '../assets/logo.png';

const CustomerHome = () => (
  <div>
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
);

export default CustomerHome;
