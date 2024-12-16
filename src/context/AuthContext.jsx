import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase";

const AuthContext = createContext();

// Function to extract role from email (e.g., name.role@gmail.com)
const extractRoleFromEmail = (email) => {
  const emailParts = email.split("@")[0].split(".");
  return emailParts.length > 1 ? emailParts[1] : null;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetails = async (email) => {
    try {
      const role = extractRoleFromEmail(email);
      if (!role) throw new Error(`Could not extract role from email: ${email}`);
      return { role, name: email };
    } catch (error) {
      console.error("Error extracting role:", error.message);
      return { role: null, name: null };
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { role, name } = await fetchUserDetails(userCredential.user.email);

      if (!role) throw new Error("No valid role found.");

      setUser(userCredential.user);
      setUserRole(role);
      setUserName(name);

      localStorage.setItem("userRole", role);
    } catch (error) {
      setError(error.message);
      console.error("Login failed:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
      setUserName(null);
      localStorage.removeItem("userRole");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setUserRole(savedRole); 
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const { role, name } = await fetchUserDetails(firebaseUser.email);
        setUser(firebaseUser);
        setUserRole(role);
        setUserName(name);
      } else {
        setUser(null);
        setUserRole(null);
        setUserName(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userRole, userName, loading, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
