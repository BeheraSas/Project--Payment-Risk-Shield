// src/components/CustomersHome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd'; // Ensure Button is imported
import logo from '../assets/logo.png';

const CustomersHome = () => {
  const navigate = useNavigate();

  // Define handleRedirect function
  const handleRedirect = () => {
    navigate('/phishing-detection');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
          <span className="app-title">Payment Risk Shield</span>
        </div>
        <div className='ml-auto'>
            <Button onClick={handleRedirect}>Phishing Detection</Button>
        </div>
      </nav>
      <h2>Welcome, Customer!</h2>
      {/* Ensure handleRedirect is correctly referenced */}
      
      {/* Add more customer-specific content here */}
    </div>
  );
};

export default CustomersHome;
