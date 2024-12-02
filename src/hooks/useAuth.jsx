import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase"; // Adjust the path as needed

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details from Firestore
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

      // Redirect based on role
      const rolePaths = {
        doctor: "/doctor",
        nurse: "/nurse",
        admin: "/admin",
        lab: "/lab",
        patient: "/patient",
        receptionist: "/receptionist",
      };
      window.location.href = rolePaths[role] || "/";
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
    } finally {
      setLoading(false);
    }
  };

  return { user, userRole, userName, loading, login, logout };
};

export default useAuth;
