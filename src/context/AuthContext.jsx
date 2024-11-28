import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user details from Firestore
  const fetchUserDetails = async (email) => {
    try {
      const normalizedEmail = email.toLowerCase();
      const userDoc = await getDoc(doc(db, "users", normalizedEmail));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return { role: userData.role, name: userData.name };
      }
      console.warn(`No document found for user: ${normalizedEmail}`);
      return { role: null, name: null };
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  // Monitor authentication state
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
        } catch (error) {
          console.error("Error handling auth state change:", error);
        }
      } else {
        // Reset state when user is signed out
        setUser(null);
        setUserRole(null);
        setUserName(null);
        localStorage.removeItem("userRole");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login handler
  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const { role, name } = await fetchUserDetails(user.email.toLowerCase());
      setUser(user);
      setUserRole(role);
      setUserName(name);
      localStorage.setItem("userRole", role);

      // Redirect based on role
      switch (role) {
        case "doctor":
          window.location.href = "/Doctor";
          break;
        case "nurse":
          window.location.href = "/Nurse";
          break;
        case "admin":
          window.location.href = "/Admin";
          break;
        case "lab":
          window.location.href = "/Lab";
          break;
        case "patient":
          window.location.href = "/Patient";
          break;
        default:
          console.error("Unknown user role:", role);
          throw new Error("Invalid role assigned. Contact system admin.");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
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
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { user, userRole, userName, loading, login, logout };
};

export default useAuth;
