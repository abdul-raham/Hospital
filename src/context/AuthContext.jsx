import React, { createContext, useContext, useState } from 'react';
import { login, signUp, logout } from '../auth';  // Import Firebase authentication methods

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Login function
  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await login(email, password);
      setUser(userCredential); // Store the authenticated user
    } catch (error) {
      console.error("Login error: ", error);
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
      console.error("Sign up error: ", error);
    }
    setLoading(false);
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);  // Reset user state
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleSignUp, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
