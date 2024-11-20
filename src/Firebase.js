import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';  // Make sure to import getFirestore
import { doc, setDoc } from "firebase/firestore";

export async function registerUser(email, password, role) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;

        // Save the role in Firestore
        await setDoc(doc(db, "users", userId), { role });
        console.log("User registered and role saved!");
    } catch (error) {
        console.error("Error registering user:", error);
    }
};

const firebaseConfig = {
  apiKey: "AIzaSyCdmHvjKgjmPPqJgmlIk2vYMXjdwcpf7hA",
  authDomain: "hosp-429ad.firebaseapp.com",
  projectId: "hosp-429ad",
  storageBucket: "hosp-429ad.appspot.com",
  messagingSenderId: "420255599423",
  appId: "1:420255599423:web:a476f91fcaa0f49121218a",
  measurementId: "G-6Y7Q7W5MWR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Initialize Firebase Auth instance
const db = getFirestore(app);  // Initialize Firestore

export { auth, createUserWithEmailAndPassword, signOut, db };  // Export all at once
