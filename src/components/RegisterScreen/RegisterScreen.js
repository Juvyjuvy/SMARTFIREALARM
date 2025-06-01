import React, { useState } from 'react';
import '../css/RegisterScreen.css';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleRegisterClick = async () => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName, // stored in raw_user_meta_data
      },
    },
  });

  if (error) {
    alert("Registration failed: " + error.message);
    return;
  }

  alert("Registered successfully! Please check your email to verify.");
  navigate('/');
};



  return (
    <div className="register-container">
      <img src="/images/fireman-icon.png" alt="Helmet Icon" className="register-icon" />

      <div className="register-box">
        <label>FULL NAME</label>
        <input
          type="text"
          placeholder="Enter full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label>EMAIL ADDRESS</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>PASSWORD</label>
        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="register-button" onClick={handleRegisterClick}>
          Register
        </button>

        <div className="bottom-link-row">
          <button className="login-inline-button" onClick={() => navigate('/')}>
            Login
          </button>
          <span className="forgot-password">Forgot Password?</span>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
