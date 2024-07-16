// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');  // Default to 'customer'
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example login logic
    if (email === 'abc@gmail.com' && password === 'abc') {
      onLogin(); // Set authenticated state
      switch(userType) {
        case 'customer':
          navigate('/customer-home');
          break;
        case 'bankingCentre':
          navigate('/banking-home');
          break;
        case 'merchant':
          navigate('/merchant-home');
          break;
        default:
          setError('Invalid user type');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>User Type:</label>
          <div>
            <input
              type="radio"
              id="customer"
              name="userType"
              value="customer"
              checked={userType === 'customer'}
              onChange={(e) => setUserType(e.target.value)}
            />
            <label htmlFor="customer">Customer</label>
            <input
              type="radio"
              id="bankingCentre"
              name="userType"
              value="bankingCentre"
              checked={userType === 'bankingCentre'}
              onChange={(e) => setUserType(e.target.value)}
            />
            <label htmlFor="bankingCentre">Banking Organisation</label>
            <input
              type="radio"
              id="merchant"
              name="userType"
              value="merchant"
              checked={userType === 'merchant'}
              onChange={(e) => setUserType(e.target.value)}
            />
            <label htmlFor="merchant">Merchant</label>
          </div>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
