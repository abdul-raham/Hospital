import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";

const AuthContext = createContext();

// Custom hook to access authentication context
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Authenticated user
  const [userRole, setUserRole] = useState(null); // User role
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user details (role and name) from Firestore
  const fetchUserDetails = async (email) => {
    try {
      const userDoc = await getDoc(doc(db, "users", email)); // Document ID = email
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return { role: userData.role, name: userData.name }; // Ensure role and name exist
      }
      console.error("No user document found");
      return { role: null, name: null };
    } catch (error) {
      console.error("Error fetching user details:", error);
      return { role: null, name: null };
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        const { role, name } = await fetchUserDetails(currentUser.email); // Fetch user data
        setUserRole(role);
        setUser((prevUser) => ({ ...prevUser, name })); // Update user with name
        localStorage.setItem("userRole", role); // Persist role locally
      } else {
        setUser(null);
        setUserRole(null);
        localStorage.removeItem("userRole");
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const { role, name } = await fetchUserDetails(user.email); // Fetch user data
      setUser(user);
      setUserRole(role);
      setUser((prevUser) => ({ ...prevUser, name })); // Add name to user state
      localStorage.setItem("userRole", role); // Persist role locally
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Rethrow for handling in login component
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
      localStorage.removeItem("userRole");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
