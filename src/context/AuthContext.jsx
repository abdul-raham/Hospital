import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase'; // Assuming Firebase authentication is set up
import { signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Login function
  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser); // Save the user to state
      navigate('/doctor'); // Redirect on successful login
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ handleLogin, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};
