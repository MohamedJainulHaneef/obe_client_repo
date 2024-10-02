import React, { createContext, useContext, useState, } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Check local storage to see if the user is authenticated
        const savedAuthState = localStorage.getItem('isAuthenticated');
        return savedAuthState === 'true';
    });
    const [staffId, setStaffId] = useState(() => {
        // Check local storage for the staff ID
        return localStorage.getItem('staffId') || null;
    });

    const login = (id) => {
        setIsAuthenticated(true);
        setStaffId(id);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('staffId', id);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setStaffId(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('staffId');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, staffId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
