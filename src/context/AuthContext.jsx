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
      const normalizedEmail = email.toLowerCase(); // Normalize email
      const userDoc = await getDoc(doc(db, "users", normalizedEmail));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Fetched user data:", userData); // Debugging log
        return { role: userData.role, name: userData.name };
      } else {
        throw new Error(`No user found for email: ${email}`);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      throw new Error("Failed to fetch user details.");
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
      const loggedInUser = userCredential.user;

      // Fetch user role and name
      const { role, name } = await fetchUserDetails(loggedInUser.email);
      if (!role || !name) {
        throw new Error("User role or name not found. Please check user data.");
      }

      // Set user data
      setUser(loggedInUser);
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
      localStorage.removeItem("userRole"); // Remove stored role
      console.log("User logged out successfully."); // Debugging log
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to log out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically set the user on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedInUser) => {
      if (loggedInUser) {
        console.log("User is authenticated:", loggedInUser.email); // Debugging log
        try {
          const { role, name } = await fetchUserDetails(loggedInUser.email);
          setUser(loggedInUser);
          setUserRole(role);
          setUserName(name);
        } catch (err) {
          console.error(
            "Error fetching user data during auth state change:",
            err
          );
        }
      } else {
        setUser(null);
        setUserRole(null);
        setUserName(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
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
