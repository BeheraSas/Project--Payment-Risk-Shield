// src/components/BankingHome.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import logo from '../assets/logo.png';

const BankingHome = () => {
  const navigate = useNavigate();

  const handleRedirectToPhishing = () => {
    navigate('/phishing-detection-bank');
  };

  const handleRedirectToGraph = () => {
    navigate('/graph-analysis');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
          <span className="app-title">Payment Risk Shield</span>
        </div>
        <div className='ml-auto'>
          <Button onClick={handleRedirectToPhishing}>Phishing Detection</Button>
          <Button onClick={handleRedirectToGraph}>Graph Analysis</Button>
        </div>
      </nav>
      <h2>Welcome, Customer!</h2>
      {/* Add more customer-specific content here */}
    </div>
  );
};

export default BankingHome;
