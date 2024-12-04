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

  // Fetch user details from Firestore
  const fetchUserDetails = async (email) => {
    console.log("Fetching user details for:", email); // Debugging log
    try {
      const normalizedEmail = email.toLowerCase();
      const userDoc = await getDoc(doc(db, "users", normalizedEmail));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Fetched user data:", userData); // Debugging log
        return { role: userData.role, name: userData.name };
      } else {
        // Corrected the error message formatting
        throw new Error(`No user details found for ${email}`);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError(err.message); // This stores the error message
      return { role: null, name: null };
    }
  };

  // Handle login
  const login = async (email, password) => {
    setLoading(true);
    setError(null); // Reset previous errors
    console.log("Attempting login for:", email); // Debugging log

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const { role, name } = await fetchUserDetails(user.email.toLowerCase());

      if (!role) {
        throw new Error("User role not found, please check user data.");
      }

      setUser(user);
      setUserRole(role);
      setUserName(name);
      localStorage.setItem("userRole", role); // Save role to local storage
      console.log(`User logged in as ${role} with name ${name}.`); // Debugging log
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
      throw err; // Re-throw error to handle it in the component
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const logout = async () => {
    setLoading(true);
    setError(null); // Reset previous errors
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
      setUserName(null);
      localStorage.removeItem("userRole");
      console.log("User logged out"); // Added log here
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to log out. Please try again.");
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
