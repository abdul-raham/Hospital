import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

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

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Create User function using Firebase Authentication
export const createUser = async (email, password, role) => {
  try {
    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Add user data (including role) to Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      email: user.email,
      role, // Adding role
      createdAt: new Date().toISOString(), // Optionally add created date for future reference
    });

    console.log("User created successfully:", user);
    return user; // Return the created user if needed
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error(error.message); // Throw an error if user creation fails
  }
};

// Function to send a message
export const sendMessage = async (recipientId, recipientType, message) => {
  try {
    await addDoc(collection(db, "messages"), {
      recipientId,
      recipientType,
      message,
      timestamp: new Date(),
    });
    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};

// Export initialized Firebase app, auth, db, and storage
export { app, auth, db, storage };
