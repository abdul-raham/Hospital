import admin from "firebase-admin";
import { readFileSync } from "fs";
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

// Debug the current working directory
console.log("Current working directory:", process.cwd());

// Initialize Firebase Admin SDK with error handling
try {
  const serviceAccount = JSON.parse(
    readFileSync("./serviceAccountKey.json", "utf8")
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("Firebase Admin initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error.message);
  process.exit(1);
}

// Function to set custom user claims
const setCustomUserClaims = async (uid, role, hospitalId) => {
  try {
    console.log(
      `Setting custom claims for UID: ${uid}, Role: ${role}, HospitalId: ${hospitalId}`
    );
    await admin.auth().setCustomUserClaims(uid, { role, hospitalId });
    console.log(
      `Custom claims set for user ${uid} with role: ${role} and hospitalId: ${hospitalId}`
    );
  } catch (error) {
    console.error("Error setting custom claims:", error.message);
  }
};

// Firebase client-side configurations
const firebaseConfig = {
  apiKey: "AIzaSyCdmHvjKgjmPPqJgmlIk2vYMXjdwcpf7hA",
  authDomain: "hosp-429ad.firebaseapp.com",
  projectId: "hosp-429ad",
  storageBucket: "hosp-429ad.appspot.com",
  messagingSenderId: "420255599423",
  appId: "1:420255599423:web:a476f91fcaa0f49121218a",
  measurementId: "G-6Y7Q7W5MWR",
};

const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized:", app.name);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

const normalizeEmail = (email) => {
  if (!email) throw new Error("Email is required for normalization.");
  return email.toLowerCase().replace(/\./g, "_");
};

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

export const createUser = async (email, password, role, hospitalId) => {
  if (!email || !password || !role || !hospitalId) {
    throw new Error("Email, password, role, and hospital ID are required.");
  }

  try {
    console.log("Creating user with email:", email);

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User created successfully:", user);

    const normalizedEmail = normalizeEmail(email);
    const userRef = doc(db, "users", normalizedEmail);

    await setDoc(userRef, {
      email: user.email,
      role,
      hospitalId,
      createdAt: new Date().toISOString(),
    });

    await addUserToHospital(hospitalId, email);

    console.log("User details saved in Firestore and added to hospital.");

    // Set custom claims
    await setCustomUserClaims(user.uid, role, hospitalId);
    console.log("Custom claims set successfully.");

    return user;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
};

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

// Call the function to set roles and hospital IDs
const userRoles = [
  { uid: "ZRJ5Q01jyeTfTqQUlNul4D5cTr", role: "nurse", hospitalId: "st_marys_hospital" },
  { uid: "KXcsHaRuyZhoi1chFkcfGlFbZ", role: "patient", hospitalId: "east_side_clinic" },
  { uid: "m3FkzQwgwiNQMDlo1HOIAnu", role: "admin", hospitalId: "st_marys_hospital" },
  { uid: "itpidkzjYDG4afvqCj0mWfFwn", role: "doctor", hospitalId: "west_end_medical_center" },
  { uid: "Ez6DO11iBKX3VNQl70a9GMB", role: "doctor", hospitalId: "east_side_clinic" },
  { uid: "kZN5iFqQGzg72gP4SmhV6sl9", role: "nurse", hospitalId: "west_end_medical_center" },
];

userRoles.forEach((user) => {
  setCustomUserClaims(user.uid, user.role, user.hospitalId);
});
