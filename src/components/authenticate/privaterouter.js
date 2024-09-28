import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authenticate';

const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useAuth(); // Use the context to check authentication

    return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
