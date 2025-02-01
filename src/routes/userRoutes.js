import express from 'express';
import admin from '../Firebase-admin/admin.js'; // Ensure Firebase Admin is imported properly
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Firebase Client SDK (Only for login/logout)
const firebaseConfig = {
  apiKey: "AIzaSyCdmHvjKgjmPPqJgmlIk2vYMXjdwcpf7hA",
  authDomain: "hosp-429ad.firebaseapp.com",
  projectId: "hosp-429ad",
  storageBucket: "hosp-429ad.appspot.com",
  messagingSenderId: "420255599423",
  appId: "1:420255599423:web:a476f91fcaa0f49121218a",
};

// Initialize Firebase Client SDK
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Initialize Express Router
const router = express.Router();

/**
 * 🛠 LOGIN ROUTE - Ensures only approved users can log in
 */
router.post("/login", async (req, res) => {
  const { email, password, hospitalId } = req.body;

  try {
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get Firebase Admin claims to check hospitalId & role
    const idTokenResult = await user.getIdTokenResult();
    const claims = idTokenResult.claims;

    // ✅ Ensure the hospitalId matches
    if (!claims.hospitalId || claims.hospitalId !== hospitalId) {
      return res.status(403).json({ message: "Unauthorized access to this hospital." });
    }

    // ✅ Ensure user is approved (admin must approve manually)
    if (!claims.approved) {
      return res.status(403).json({ message: "Account not yet approved by admin." });
    }

    res.status(200).json({
      message: "Login successful",
      role: claims.role || "user",
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(401).json({ message: "Invalid credentials", error: error.message });
  }
});

/**
 * 🛠 SIGN-UP ROUTE - Creates a new user, but requires admin approval
 */
router.post("/signup", async (req, res) => {
  const { email, password, role, hospitalId } = req.body;

  try {
    // ✅ Step 1: Create User in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
      disabled: false,
    });

    // ✅ Step 2: Assign Custom Claims (Role & Hospital)
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      role,
      hospitalId,
      approved: false, // 🚨 Not approved yet! Admin must approve manually.
    });

    console.log(`✅ New user created: ${email} (Hospital: ${hospitalId}, Role: ${role})`);

    res.status(200).json({
      message: "Account created successfully, pending admin approval.",
      user: { uid: userRecord.uid, email, role, hospitalId },
    });
  } catch (error) {
    console.error("Sign-up failed:", error);
    res.status(400).json({ message: "Failed to sign up", error: error.message });
  }
});

/**
 * 🛠 ADMIN APPROVAL ROUTE - Admin approves users before they can log in
 */
router.post("/approve-user", async (req, res) => {
  const { uid } = req.body;

  try {
    // ✅ Step 1: Get User Details
    const user = await admin.auth().getUser(uid);
    
    // ✅ Step 2: Ensure user exists
    if (!user.customClaims || !user.customClaims.role || !user.customClaims.hospitalId) {
      return res.status(400).json({ message: "User does not have valid custom claims." });
    }

    // ✅ Step 3: Approve the user
    await admin.auth().setCustomUserClaims(uid, {
      ...user.customClaims,
      approved: true, // ✅ Now the user can log in
    });

    console.log(`✅ User approved: ${user.email}`);
    res.status(200).json({ message: "User approved successfully." });
  } catch (error) {
    console.error("Approval failed:", error);
    res.status(500).json({ message: "Failed to approve user", error: error.message });
  }
});

/**
 * 🛠 LOGOUT ROUTE
 */
router.post("/logout", async (req, res) => {
  try {
    await signOut(auth);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout failed:", error);
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
});

export default router;
