// components/LoginScreen/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setChecking(false);
    };

    checkSession();
  }, []);

  if (checking) return null; // Or show a spinner/loading screen

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
