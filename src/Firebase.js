import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
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
 * Utility to normalize email addresses for Firestore document keys.
 * Replaces '.' with '_' to prevent conflicts in Firestore paths.
 * @param {string} email - User email address.
 * @returns {string} - Normalized email address.
 */
const normalizeEmail = (email) => {
  if (!email) throw new Error("Email is required for normalization.");
  return email.toLowerCase().replace(/\./g, "_");
};

/**
 * Add a new hospital to the Firestore database.
 * @param {string} hospitalId - Unique ID for the hospital.
 * @param {string} name - Name of the hospital.
 * @param {Array} users - List of user emails for the hospital.
 */
export const addHospital = async (hospitalId, name, users = []) => {
  try {
    const hospitalRef = doc(db, "hospitals", hospitalId);
    await setDoc(hospitalRef, {
      name,
      users,
    });
    console.log(`Hospital "${name}" added successfully.`);
  } catch (error) {
    console.error("Error adding hospital:", error.message);
    throw error;
  }
};

/**
 * Add a user to a hospital's users array in Firestore.
 * @param {string} hospitalId - The ID of the hospital.
 * @param {string} email - The email of the user to add.
 */
export const addUserToHospital = async (hospitalId, email) => {
  try {
    const hospitalRef = doc(db, "hospitals", hospitalId);
    const hospitalDoc = await getDoc(hospitalRef);

    if (!hospitalDoc.exists()) {
      throw new Error(`Hospital with ID "${hospitalId}" does not exist.`);
    }

    await updateDoc(hospitalRef, {
      users: arrayUnion(email),
    });
    console.log(`User "${email}" added to hospital "${hospitalId}".`);
  } catch (error) {
    console.error("Error adding user to hospital:", error.message);
    throw error;
  }
};

/**
 * Create a new user, assign a role, and add them to a hospital.
 * @param {string} email - User email address.
 * @param {string} password - User password.
 * @param {string} role - Role to assign to the user.
 * @param {string} hospitalId - Hospital ID to add the user to.
 */
export const createUser = async (email, password, role, hospitalId) => {
  if (!email || !password || !role || !hospitalId) {
    throw new Error("Email, password, role, and hospital ID are required.");
  }

  try {
    console.log("Creating user with email:", email);

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User created successfully:", user);

    // Save user details in Firestore
    const normalizedEmail = normalizeEmail(email);
    const userRef = doc(db, "users", normalizedEmail);

    await setDoc(userRef, {
      email: user.email,
      role,
      hospitalId,
      createdAt: new Date().toISOString(),
    });

    // Add user to the hospital's users array
    await addUserToHospital(hospitalId, email);

    console.log("User details saved in Firestore and added to hospital.");
    return user;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
};

/**
 * Populate the "hospitals" collection in Firestore with default data if empty.
 */
export const populateHospitalData = async () => {
  try {
    const snapshot = await getDocs(collection(db, "hospitals"));
    if (snapshot.empty) {
      console.log("No hospitals found. Adding default data...");

      const defaultHospitals = [
        { id: "st_marys_hospital", name: "St. Mary's Hospital" },
        { id: "city_clinic", name: "City Clinic" },
        { id: "health_centre", name: "Health Centre" },
      ];

      for (const hospital of defaultHospitals) {
        await addHospital(hospital.id, hospital.name);
      }

      console.log("Default hospital data added.");
    } else {
      console.log("Hospitals already exist in Firestore.");
    }
  } catch (error) {
    console.error("Error populating hospitals: ", error.message);
    throw error;
  }
};
