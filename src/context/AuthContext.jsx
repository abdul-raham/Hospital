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
      const normalizedEmail = email.toLowerCase();
      const userDoc = await getDoc(doc(db, "users", normalizedEmail));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return { role: userData.role, name: userData.name };
      }
      throw new Error(`No user details found for ${email}`);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError(err.message);
      return { role: null, name: null };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        try {
          const { role, name } = await fetchUserDetails(currentUser.email);
          setUser(currentUser);
          setUserRole(role);
          setUserName(name);
          localStorage.setItem("userRole", role);
        } catch (err) {
          setError(err.message);
        }
      } else {
        setUser(null);
        setUserRole(null);
        setUserName(null);
        localStorage.removeItem("userRole");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const { role, name } = await fetchUserDetails(user.email.toLowerCase());
      setUser(user);
      setUserRole(role);
      setUserName(name);
      localStorage.setItem("userRole", role);
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
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

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
