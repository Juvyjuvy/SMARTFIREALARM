import React from 'react';
import './LoginScreen.css';

function LoginScreen({ onLogin, onRegister }) {
  const handleLoginClick = () => {
    onLogin();
  };

  const handleRegisterClick = () => {
    onRegister();
  };

  return (
    <div className="login-container">
      <img src="/fireman-icon.png" alt="Helmet Icon" className="login-icon" />

      <div className="login-box">
        <div className="email-label-row">
          <label>EMAIL ADDRESS</label>
        </div>
        <input type="email" placeholder="Enter email" />

        <label>PASSWORD</label>
        <input type="password" placeholder="Enter password" />

        <button className="login-button" onClick={handleLoginClick}>Log in</button>

        <div className="login-footer-row">
          <button className="inline-register-button" onClick={handleRegisterClick}>Register</button>
          <p className="forgot-password">Forgot Password?</p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
