const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf8")
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
console.log("Firebase Admin Initialized.");

/**
 * Assign custom claims to a user
 * @param {string} uid - The Firebase UID of the user
 * @param {string} role - The role to assign to this user
 */
const setCustomClaims = async (uid, role) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`Custom claims set: ${role} for ${uid}`);
  } catch (error) {
    console.error("Error setting custom claims:", error);
    throw new Error(error.message);
  }
};

module.exports = { setCustomClaims };
