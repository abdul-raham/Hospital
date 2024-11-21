import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Import getAuth for authentication
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

// Export initialized Firebase app, auth, and db
export { app, auth, db };
