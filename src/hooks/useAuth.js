import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';  // Make sure the path to firebaseConfig is correct
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // Set the user if authenticated or null if not
      setLoading(false);     // Set loading to false after auth state is checked
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return { user, loading };  // Return the user and loading states
};

export default useAuth;
