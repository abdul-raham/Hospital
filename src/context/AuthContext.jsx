// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { login, signUp, logout } from '../auth';  // Import Firebase helper functions

const AuthContext = createContext();  // Create context for authentication

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Login function
  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await login(email, password);
      setUser(userCredential);  // Set authenticated user
    } catch (error) {
      console.error(error.message);  // Handle login error
    }
    setLoading(false);
  };

  // Sign up function
  const handleSignUp = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signUp(email, password);
      setUser(userCredential);  // Set authenticated user
    } catch (error) {
      console.error(error.message);  // Handle sign-up error
    }
    setLoading(false);
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);  // Reset user state
    } catch (error) {
      console.error(error.message);  // Handle logout error
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleSignUp, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};
