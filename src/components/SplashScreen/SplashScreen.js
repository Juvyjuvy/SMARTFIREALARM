import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SplashScreen.css';

function SplashScreen() {
  const [startAnimation, setStartAnimation] = useState(false);
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setStartAnimation(true);
    }, 1500);

    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2800);

    const redirectTimer = setTimeout(() => {
      navigate('/login'); // Redirect to LoginScreen
    }, 4000); // Total delay before redirect (adjust as needed)

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className={`shadow ${startAnimation ? 'hide-shadow' : ''}`} />
      <div className="logo-wrapper">
        <img src="/images/fireman-icon.png" alt="Helmet Icon" className="helmet-icon" />
        {showText && (
          <h1 className="app-title">Smart Fire Alarm</h1>
        )}
      </div>
    </div>
  );
}

export default SplashScreen;
