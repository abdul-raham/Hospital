import express from 'express';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdmHvjKgjmPPqJgmlIk2vYMXjdwcpf7hA",
  authDomain: "hosp-429ad.firebaseapp.com",
  projectId: "hosp-429ad",
  storageBucket: "hosp-429ad.appspot.com",
  messagingSenderId: "420255599423",
  appId: "1:420255599423:web:a476f91fcaa0f49121218a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Initialize Express Router
const router = express.Router();

// Login route with hospital ID validation
router.post("/login", async (req, res) => {
  const { email, password, hospitalId } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get the ID token and check the custom claim for hospitalId
    const idTokenResult = await user.getIdTokenResult();

    if (!idTokenResult.claims.hospitalId || idTokenResult.claims.hospitalId !== hospitalId) {
      return res.status(403).json({ message: "Unauthorized access to this hospital." });
    }

    res.status(200).json({
      message: "Login successful",
      role: idTokenResult.claims.role || "user",
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(401).json({ message: "Invalid credentials", error: error.message });
  }
});

// Sign-up route
router.post("/signup", async (req, res) => {
  const { email, password, hospitalId } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Optionally set custom claims for hospitalId and role (requires Firebase Admin SDK)
    console.log("User signed up successfully:", user.email, hospitalId);

    res.status(200).json({
      message: "Account created successfully",
      user: { uid: user.uid, email: user.email, hospitalId },
    });
  } catch (error) {
    console.error("Sign-up failed:", error);
    res.status(400).json({ message: "Failed to sign up", error: error.message });
  }
});

// Logout route
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
