import React, { createContext, useContext, useState } from 'react';
import { login, signUp, logout } from '../auth';  // Adjusted path as per your structure

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await login(email, password);
      setUser(userCredential);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  const handleSignUp = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signUp(email, password);
      setUser(userCredential);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleSignUp, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
