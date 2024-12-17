import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, getIdTokenResult } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
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

// Log Firebase initialization to ensure it's set up correctly
console.log("Firebase app initialized:", app.name);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Predefined hospital data
const hospitalData = [
  { id: "east_side_clinic", name: "East Side Clinic" },
  { id: "west_end_medical_center", name: "West End Medical Center" },
  { id: "st_marys_hospital", name: "St. Mary's Hospital" },
];

/**
 * Populate hospitals collection with predefined data if it doesn't exist.
 */
export const populateHospitalData = async () => {
  try {
    const hospitalsCollection = collection(db, "hospitals");
    const snapshot = await getDocs(hospitalsCollection);

    if (snapshot.empty) {
      console.log("No hospital data found. Populating with default data...");
      for (const hospital of hospitalData) {
        const hospitalRef = doc(hospitalsCollection, hospital.id);
        await setDoc(hospitalRef, { name: hospital.name });
      }
      console.log("Hospital data populated successfully.");
    } else {
      console.log("Hospital data already exists. Skipping population.");
    }
  } catch (error) {
    console.error("Error populating hospital data:", error);
  }
};
