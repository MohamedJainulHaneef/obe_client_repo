import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './authenticate'; // Make sure the path is correct

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  // If the user is not authenticated, redirect them to the login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
