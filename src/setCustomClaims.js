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
const setCustomUserClaims = async (uid, role) => {
  try {
    console.log(`Setting custom claims for UID: ${uid}, Role: ${role}`);
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`Custom claims set for user ${uid} with role: ${role}`);
  } catch (error) {
    console.error("Error setting custom claims:", error.message);
  }
};

// Call the function to set roles
const userRoles = [
  { uid: "ZRJ5Q01jyeTfTqQUlNul4D5cTr...", role: "nurse" },
  { uid: "Ez6DO11iBKX3VNQl70a9GMB...", role: "doctor" },
  { uid: "m3FkzQwgINQMDa1HOIA...", role: "admin" },
];

userRoles.forEach((user) => {
  setCustomUserClaims(user.uid, user.role);
});
