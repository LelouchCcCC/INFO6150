// frontend/src/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('user')
  );

  axios.defaults.withCredentials = true; 

  const login = async (email, password) => {
    try {
      const response = await axios.post('/user/authenticate', { email, password });
      
      if (response.status === 200) {
        const userData = { 
          email: response.data.email, 
          fullName: response.data.fullName 
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, message: 'Login successful!' };
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.error || error.message);
      return { 
        success: false, 
        message: error.response?.data?.error || 'Login failed due to network error.' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};