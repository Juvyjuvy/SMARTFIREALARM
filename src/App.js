import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen/SplashScreen';
import RegisterScreen from './components/RegisterScreen/RegisterScreen';
import LoginScreen from './components/LoginScreen/LoginScreen';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleStartRegister = () => {
    setIsRegistering(true);
  };

  const handleBackToLogin = () => {
    setIsRegistering(false);
  };

  return (
    <div className="App">
      {showSplash ? (
        <SplashScreen />
      ) : loggedIn ? (
        <Dashboard />
      ) : isRegistering ? (
        <RegisterScreen onBackToLogin={handleBackToLogin} />
      ) : (
        <LoginScreen onLogin={handleLogin} onRegister={handleStartRegister} />
      )}
    </div>
  );
}

export default App;
