import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";

// Function to check if user email belongs to an authorized hospital user
const checkUserAuthorization = async (email) => {
  try {
    const hospitalsSnapshot = await getDocs(collection(db, "hospitals"));
    for (const hospitalDoc of hospitalsSnapshot.docs) {
      const hospitalData = hospitalDoc.data();
      if (hospitalData.users.includes(email)) {
        return { authorized: true, hospital: hospitalData.name };
      }
    }
    console.warn("No hospital found with this email.");
    return { authorized: false };
  } catch (error) {
    console.error("Error checking user authorization:", error);
    return { authorized: false };
  }
};

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userHospital, setUserHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        const { authorized, hospital } = await checkUserAuthorization(
          firebaseUser.email
        );

        if (authorized) {
          setUserRole("authorized");
          setUserHospital(hospital);
        } else {
          signOut(auth);
          setUser(null);
          setUserRole(null);
          setUserHospital(null);
        }
      } else {
        setUser(null);
        setUserRole(null);
        setUserHospital(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { authorized, hospital } = await checkUserAuthorization(userCredential.user.email);

      if (!authorized) {
        throw new Error("You are not authorized to access this dashboard.");
      }

      setUser(userCredential.user);
      setUserRole("authorized");
      setUserHospital(hospital);

      return hospital;
    } catch (error) {
      console.error("Login failed: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
      setUserHospital(null);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return { user, userRole, userHospital, loading, login, logout };
};

export default useAuth;
