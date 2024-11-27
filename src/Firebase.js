import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Import createUserWithEmailAndPassword
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore and methods
import { collection, addDoc } from "firebase/firestore";

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

// Initialize Firestore (if you're using it)
const db = getFirestore(app);

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

    // Add role or other user data to Firestore (assuming you have a "users" collection)
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { role });

    console.log("User created successfully:", user);
    return user; // Return the created user if needed
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error(error.message); // Throw an error if user creation fails
  }
};
const sendMessage = async (recipientId, recipientType, message) => {
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

// Export initialized Firebase app, auth, and db
export { app, auth, db };
