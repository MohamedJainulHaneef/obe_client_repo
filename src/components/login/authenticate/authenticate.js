import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(); // Define AuthContext

export const AuthProvider = ({ children }) => 
{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [staffId, setStaffId] = useState(null);

    const login = (id) => 
    {
        setIsAuthenticated(true);
        setStaffId(id);
    };

    const logout = () => 
    {
        setIsAuthenticated(false);
        setStaffId(null);
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
