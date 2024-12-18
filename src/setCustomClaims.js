import admin from "firebase-admin";
import { readFileSync } from "fs";

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
  