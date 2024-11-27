import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import { auth, db } from "../Firebase"; // Ensure `db` (Firestore instance) is correctly imported

const AuthContext = createContext();

// Custom hook to access authentication context
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to fetch the user's role from Firestore
  const fetchUserRole = async (email) => {
    try {
      const userDoc = await getDoc(doc(db, "users", email)); // Assumes roles are stored under "users/{email}"
      if (userDoc.exists()) {
        return userDoc.data().role; // Ensure "role" exists in Firestore document
      }
      console.error("No role found for this user");
      return null;
    } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
  };

  // Listening to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true); // Start loading while fetching user data
      if (currentUser) {
        setUser(currentUser);
        const role = await fetchUserRole(currentUser.email); // Fetch user role
        setUserRole(role);
        localStorage.setItem("userRole", role); // Persist role in local storage
      } else {
        setUser(null);
        setUserRole(null);
        localStorage.removeItem("userRole"); // Clear role on logout
      }
      setLoading(false); // Loading complete
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  // Login function to authenticate user
  const login = (email, password) => {
    setLoading(true); // Set loading true when login attempt starts
    return signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setUser(user);
        const role = await fetchUserRole(user.email); // Fetch role after login
        setUserRole(role);
        localStorage.setItem("userRole", role); // Persist role locally
        setLoading(false); // Set loading to false after successful login
      })
      .catch((error) => {
        setLoading(false); // Set loading to false on error
        throw error; // Throw error to be caught in the login page
      });
  };

  // Logout function to sign out the user
  const logout = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
        setUserRole(null);
        localStorage.removeItem("userRole"); // Clear role on logout
        setLoading(false); // Set loading to false after logout
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
