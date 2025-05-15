import React from 'react';
import './LoginScreen.css';

function LoginScreen({ onLogin }) {
  const handleLoginClick = () => {
    // You can add validation here if needed
    onLogin(); // Call the handler passed from App.js
  };

  return (
    <div className="login-container">
      <img src="/fireman-icon.png" alt="Helmet Icon" className="login-icon" />

      <div className="login-box">
        <label>EMAIL ADDRESS</label>
        <input type="email" placeholder="Enter email" />

        <label>PASSWORD</label>
        <input type="password" placeholder="Enter password" />

        <button className="login-button" onClick={handleLoginClick}>Log in</button>
        <p className="forgot-password">Forgot Password?</p>
      </div>
    </div>
  );
}

export default LoginScreen;
