import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCdmHvjKgjmPPqJgmlIk2vYMXjdwcpf7hA",
  authDomain: "hosp-429ad.firebaseapp.com",
  projectId: "hosp-429ad",
  storageBucket: "hosp-429ad.appspot.com",
  messagingSenderId: "420255599423",
  appId: "1:420255599423:web:a476f91fcaa0f49121218a",
  measurementId: "G-6Y7Q7W5MWR",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized:", app.name);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

/**
 * Set custom claims for role-based authentication.
 * @param {object} user - Authenticated user.
 * @param {string} role - User role.
 */
export const setCustomClaims = async (user, role) => {
  try {
    const tokenResult = await user.getIdTokenResult(true); // Force refresh
    console.log("Token result obtained:", tokenResult);
    if (!tokenResult.claims.role) {
      console.log("No role claims found, attempting to set custom claims.");
      await user.getIdToken({ forceRefresh: true });
    }
  } catch (error) {
    console.error("Error while fetching custom claims or token refresh:", error);
  }
};

/**
 * Create a new user and save role in Firestore.
 */
export const createUser = async (email, password, role) => {
  try {
    console.log("Attempting to create user with email:", email);

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    console.log("User created successfully:", userCredential.user);

    await setCustomClaims(userCredential.user, role);

    const normalizedEmail = email.toLowerCase().replace('.', '_');
    const userRef = doc(db, "users", normalizedEmail);

    await setDoc(userRef, {
      email: userCredential.user.email,
      role,
      createdAt: new Date().toISOString(),
    });

    console.log("User details saved in Firestore.");
    return userCredential.user;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error(error.message);
  }
};

/**
 * Test connection to Firebase manually (Debugging Step)
 */
export const testFirebaseConnection = async () => {
  try {
    const response = await fetch(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCdmHvjKgjmPPqJgmlIk2vYMXjdwcpf7hA',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123', returnSecureToken: true }),
      }
    );
    const data = await response.json();
    console.log("Firebase test connection response:", data);
  } catch (error) {
    console.error("Firebase test connection error:", error);
  }
};
