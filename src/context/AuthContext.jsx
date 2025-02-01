import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase"; // Import Firestore database
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [hospitalId, setHospitalId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(db, "users", authUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(authUser);
            setRole(userData.role);
            setHospitalId(userData.hospitalId);
          } else {
            console.error("User data not found in Firestore");
            setUser(null);
            auth.signOut(); // Logout if no Firestore data found
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
          auth.signOut();
        }
      } else {
        setUser(null);
        setRole(null);
        setHospitalId(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, hospitalId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
