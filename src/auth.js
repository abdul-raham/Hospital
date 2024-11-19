// src/auth.js
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = getAuth(); // Initialize Firebase Auth instance

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
