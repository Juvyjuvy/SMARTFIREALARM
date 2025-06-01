import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen/SplashScreen';
import RegisterScreen from './components/RegisterScreen/RegisterScreen';
import LoginScreen from './components/LoginScreen/LoginScreen';
import Dashboard from './components/Dashboard/Dashboard';
import ProfilePage from './components/Dashboard/ProfilePage';
import Monitoring from './components/Dashboard/Monitoring';
import ProtectedRoute from './components/LoginScreen/ProtectedRoute';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/dashboard"  
          element={
        <ProtectedRoute>
        <Dashboard />
    </ProtectedRoute>
  }
/>

      </Routes>
    </Router>
  );
}

export default App;
