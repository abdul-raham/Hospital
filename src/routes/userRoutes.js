const express = require("express");
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = require("firebase/auth");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdmHvjKgjmPPqJgmlIk2vYMXjdwcpf7hA",
  authDomain: "hosp-429ad.firebaseapp.com",
  projectId: "hosp-429ad",
  storageBucket: "hosp-429ad.appspot.com",
  messagingSenderId: "420255599423",
  appId: "1:420255599423:web:a476f91fcaa0f49121218a",
};

// Initialize Express app
const app = express();
app.use(express.json());

// Initialize Firebase Auth
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Login Endpoint with Hospital ID validation
app.post("/api/auth/login", async (req, res) => {
  const { email, password, hospitalId } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simulate fetching claims or hospital information. Replace this logic with your database logic if needed.
    const idTokenResult = await user.getIdTokenResult();

    // Simulate hospitalId comparison
    if (!idTokenResult.claims.hospitalId || idTokenResult.claims.hospitalId !== hospitalId) {
      return res.status(403).json({
        message: "You are not authorized to access this hospital.",
      });
    }

    res.status(200).json({
      message: "Login successful",
      role: idTokenResult.claims.role || "user",
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Sign-up Endpoint
app.post("/api/auth/signup", async (req, res) => {
  const { email, password, hospitalId } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simulate assigning hospital ID to the user in the custom claims (this step would require admin SDK logic)
    const idTokenResult = await user.getIdTokenResult();
    console.log("User signed up successfully:", user.email, hospitalId);

    res.status(200).json({
      message: "Account created successfully",
      user: { uid: user.uid, email: user.email, hospitalId },
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to sign up", error: error.message });
  }
});

// Logout Endpoint
app.post("/api/auth/logout", async (req, res) => {
  try {
    await signOut(auth);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend server started on port ${PORT}`));
