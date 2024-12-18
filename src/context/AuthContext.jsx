import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Firebase";

// Service logic fetch-based login
export const loginService = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Unable to log in");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutService = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) throw new Error("Logout failed");
    return response.json();
  } catch (error) {
    throw error;
  }
};

const AuthContext = createContext();

// Function to extract role from email
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

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginService(email, password);
      const role = extractRoleFromEmail(data.email);

      if (!role) throw new Error("No valid role found.");

      setUser(data);
      setUserRole(role);
      setUserName(data.email);

      localStorage.setItem("userRole", role);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const result = await logoutService();
      console.log("Logged out", result);

      setUser(null);
      setUserRole(null);
      setUserName(null);

      localStorage.removeItem("userRole");
    } catch (error) {
      console.error("Logout failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setUserRole(savedRole);
    }

    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const role = extractRoleFromEmail(firebaseUser.email);
        setUser(firebaseUser);
        setUserRole(role);
        setUserName(firebaseUser.email);
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
