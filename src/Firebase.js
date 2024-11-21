import { initializeApp } from 'firebase/app';
<<<<<<< HEAD
import { getAuth } from 'firebase/auth'; // Import getAuth for authentication
import { getFirestore } from 'firebase/firestore'; // Import Firestore if you're using it
=======
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
>>>>>>> 02ad1770a5923cdd6e0de5698854fb8ba5f22619

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

<<<<<<< HEAD
// Export initialized Firebase app
export { app };

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore (if you use it)
const db = getFirestore(app);

export { auth, db }; // Export auth and db if needed in other files
=======
// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
>>>>>>> 02ad1770a5923cdd6e0de5698854fb8ba5f22619
