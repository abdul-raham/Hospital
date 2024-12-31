import admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp();

// Define the setCustomUserClaims function
const setCustomUserClaims = async (uid, role, hospitalId) => {
  try {
    await admin.auth().setCustomUserClaims(uid, {
      role: role,
      hospitalId: hospitalId,
    });
    console.log(`Custom claims set for UID: ${uid}`);
  } catch (error) {
    console.error(`Error setting custom claims for UID: ${uid}`, error.message);
  }
};

// Define user roles and hospital data
const userRoles = [
  { uid: "ZRJ5Q01jyeTfTqQUlNul4D5cTr", role: "nurse", hospitalId: "st_marys_hospital" },
  { uid: "KXcsHaRuyZhoi1chFkcfGlFbZ", role: "patient", hospitalId: "east_side_clinic" },
  { uid: "m3FkzQwgwiNQMDlo1HOIAnu", role: "admin", hospitalId: "st_marys_hospital" },
  { uid: "itpidkzjYDG4afvqCj0mWfFwn", role: "doctor", hospitalId: "west_end_medical_center" },
  { uid: "Ez6DO11iBKX3VNQl70a9GMB", role: "doctor", hospitalId: "east_side_clinic" },
  { uid: "kZN5iFqQGzg72gP4SmhV6sl9", role: "nurse", hospitalId: "west_end_medical_center" },
];

// Execute the function for each user
const assignRoles = async () => {
  for (const user of userRoles) {
    try {
      await setCustomUserClaims(user.uid, user.role, user.hospitalId);
    } catch (error) {
      console.error(`Failed to set claims for user ${user.uid}:`, error.message);
    }
  }
};

// Assign roles to all users
assignRoles();
