import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen/SplashScreen';
import LoginScreen from './components/LoginScreen/LoginScreen';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      {showSplash ? (
        <SplashScreen />
      ) : loggedIn ? (
        <Dashboard />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
