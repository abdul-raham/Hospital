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

  // Extract role from the email (name.role@gmail.com)
  const extractRoleFromEmail = (email) => {
    const emailParts = email.split("@")[0].split("."); // Get part before @ and then split by .
    const role = emailParts.length > 1 ? emailParts[1] : null;
    return role;
  };

  const fetchUserDetails = async (email) => {
    try {
      const normalizedEmail = email.toLowerCase();
      const userDoc = await getDoc(doc(db, "users", normalizedEmail));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return { role: userData.role, name: userData.name };
      }
      throw new Error(`No user details found for ${email}`);
    } catch (error) {
      console.error("Error fetching user details:", error);
      return { role: null, name: null };
    }
  };

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

      // Extract role from email (e.g., "name.role@gmail.com")
      const extractedRole = extractRoleFromEmail(user.email);

      if (!extractedRole) {
        throw new Error("No role extracted from email.");
      }

      setUser(user);
      setUserRole(extractedRole); // Use extracted role
      setUserName(name);
      localStorage.setItem("userRole", extractedRole);
    } catch (error) {
      setError(error.message);
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

  // Add onAuthStateChanged and session persistence
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setUserRole(savedRole); // Restore role if saved
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const { role, name } = await fetchUserDetails(
          firebaseUser.email.toLowerCase()
        );
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

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
