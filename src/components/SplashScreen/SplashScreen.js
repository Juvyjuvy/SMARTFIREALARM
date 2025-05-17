import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

function SplashScreen() {
  const [startAnimation, setStartAnimation] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setStartAnimation(true);
    }, 1500);

    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2800);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div className="splash-container">
      <div className={`shadow ${startAnimation ? 'hide-shadow' : ''}`} />
      <div className="logo-wrapper">
  <img src="/fireman-icon.png" alt="Helmet Icon" className="helmet-icon" />

        {showText && (
          <h1 className="app-title">Smart Fire Alarm</h1>
        )}
      </div>
    </div>
  );
}

export default SplashScreen;
