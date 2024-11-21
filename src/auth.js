import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdmHvjKgjmPPqJgmlIk2vYMXjdwcpf7hA",
  authDomain: "hosp-429ad.firebaseapp.com",
  projectId: "hosp-429ad",
  storageBucket: "hosp-429ad.appspot.com", 
  messagingSenderId: "420255599423",
  appId: "1:420255599423:web:a476f91fcaa0f49121218a",
  measurementId: "G-6Y7Q7W5MWR"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Auth instance

// Login function
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user; // Return the user object
};

// Sign-up function
export const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user; // Return the user object
};

// Logout function
export const logout = async () => {
  await signOut(auth); // Log out the user
};

// Exporting auth and functions together for use in other parts of the app
export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
