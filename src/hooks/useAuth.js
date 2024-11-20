import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';  // Firebase config
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // Set user state based on authentication
      setLoading(false);     // Set loading to false after checking auth state
    });

    // Cleanup listener on unmount
    return unsubscribe;
  }, []);

  return { user, loading };
};

export default useAuth;
