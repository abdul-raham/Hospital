import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";

// Debug the current working directory
console.log("Current working directory:", process.cwd());

// Load the service account key from the config folder
try {
  const serviceAccountPath = path.resolve(__dirname, "../config/serviceAccountKey.json");
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

  // Initialize Firebase Admin SDK
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("Firebase Admin initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error.message);
  process.exit(1);
}

/**
 * Function to set custom user claims
 * @param {string} uid - The Firebase UID of the user
 * @param {string} role - The user's role (e.g., nurse, patient, etc.)
 * @param {string} hospitalId - The ID of the hospital associated with the user
 */
export const setCustomUserClaims = async (uid, role, hospitalId) => {
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
    throw error;
  }
};

// Exporting admin for additional use if needed
export default admin;
