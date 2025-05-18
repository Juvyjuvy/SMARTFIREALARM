import React from 'react';
import './RegisterScreen.css';

function RegisterScreen({ onBackToLogin }) {
  const handleRegisterClick = () => {
    alert("Registered successfully!");
    onBackToLogin();
  };

  return (
    <div className="register-container">
      <img src="/fireman-icon.png" alt="Helmet Icon" className="register-icon" />

      <div className="register-box">
        <div className="label-with-button">
          <label>FULL NAME</label>
          <button className="login-inline-button" onClick={onBackToLogin}>
            Login
          </button>
        </div>

        <input type="text" placeholder="Enter full name" />

        <label>EMAIL ADDRESS</label>
        <input type="email" placeholder="Enter email" />

        <label>PASSWORD</label>
        <input type="password" placeholder="Create password" />

        <button className="register-button" onClick={handleRegisterClick}>
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterScreen;
