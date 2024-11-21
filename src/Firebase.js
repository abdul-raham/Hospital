import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';  // Import createUserWithEmailAndPassword
import { getFirestore } from 'firebase/firestore'; // Import Firestore if you're using it

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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // You can add role or other user data to Firestore if needed
    // For example, adding role to Firestore (assuming you have a "users" collection)
    // await db.collection('users').doc(user.uid).set({ role });

    console.log('User created successfully:', user);
    return user;  // Return the created user if needed
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw new Error(error.message);  // Throw an error if user creation fails
  }
};

// Export initialized Firebase app, auth, and db
export { app, auth, db };
