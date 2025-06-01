import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import '../css/LoginScreen.css';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Login failed: ' + error.message);
      return;
    }

    // data.user is the logged-in user
    if (data.user) {
      // Check if user email is confirmed
      // Supabase sets 'email_confirmed_at' when email is verified
      if (data.user.email_confirmed_at) {
        // Email confirmed, redirect to dashboard
        navigate('/dashboard');
      } else {
        alert('Please verify your email before logging in.');
        // Optionally, you can log them out if needed:
        await supabase.auth.signOut();
      }
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <img src="/images/fireman-icon.png" alt="Helmet Icon" className="login-icon" />

      <div className="login-box">
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
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleLoginClick}>
          Log in
        </button>

        <div className="login-footer-row">
          <button className="inline-register-button" onClick={handleRegisterClick}>
            Register
          </button>
          <p className="forgot-password">Forgot Password?</p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
