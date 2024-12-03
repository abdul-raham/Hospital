import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetails = async (email) => {
    try {
      const normalizedEmail = email.replace(/\./g, "_").toLowerCase(); // Prevent Firestore ID issues
      const userDoc = await getDoc(doc(db, "users", normalizedEmail));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Fetched user details:", userData);
        return { role: userData.role, name: userData.name };
      } else {
        throw new Error(`No user details found for ${email}`);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError(err.message);
      return { role: null, name: null };
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const { role, name } = await fetchUserDetails(user.email.toLowerCase());

      if (!role) {
        throw new Error("User role not found, please check user data.");
      }

      setUser(user);
      setUserRole(role);
      setUserName(name);
      localStorage.setItem("userRole", role);
      console.log("User logged in with role:", role);
    } catch (err) {
      setError(err.message);
      throw err;
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
      console.log("User logged out");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add onAuthStateChanged and session persistence
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setUserRole(savedRole); // Restore role if saved
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const { role, name } = await fetchUserDetails(firebaseUser.email.toLowerCase());
        setUserRole(role);
        setUserName(name);
      } else {
        setUser(null);
        setUserRole(null);
        setUserName(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userRole, userName, loading, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Use this to access the Auth context
const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext }; // Named export
