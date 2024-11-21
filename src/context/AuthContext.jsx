import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../Firebase";

const AuthContext = createContext();

// Custom hook to access authentication context
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listening to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // Set the user after authentication state changes
      setLoading(false);     // Set loading to false once the user state is updated
    });

    return () => unsubscribe();  // Cleanup the listener when the component unmounts
  }, []);

  // Login function to authenticate user
  const login = (email, password) => {
    setLoading(true); // Set loading true when login attempt starts
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user); // Set authenticated user
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
        setUser(null); // Reset user state after logout
        setLoading(false); // Set loading to false after logout
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
