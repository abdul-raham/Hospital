import React, { useState } from "react";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import { auth, db } from "../../../Firebase"; // Firebase auth and firestore imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AdminCreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(""); // Error handling state
  const [success, setSuccess] = useState(false); // Success feedback state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      // Create user with email and password in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Get the user ID from the created user
      const userId = userCredential.user.uid;

      // Save user information to Firestore with the role
      await setDoc(doc(db, "users", userId), {
        email: email,
        role: role,
        createdAt: new Date().toISOString(), // Optional: Timestamp for record
      });

      // Reset the form and display success message
      setEmail("");
      setPassword("");
      setRole("");
      setSuccess(true);
    } catch (err) {
      // Display error message
      setError(err.message);
    }
  };

  return (
    <Box sx={{ padding: 3, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Create New User</Typography>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />

        {/* Password Field */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
        />

        {/* Role Dropdown */}
        <TextField
          label="Role"
          variant="outlined"
          fullWidth
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          margin="normal"
          select
        >
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="nurse">Nurse</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="receptionist">Receptionist</MenuItem>
        </TextField>

        {/* Submit Button */}
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Create User
        </Button>
      </form>

      {/* Display Success or Error Messages */}
      {success && <Typography color="success" sx={{ marginTop: 2 }}>User created successfully!</Typography>}
      {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}
    </Box>
  );
};

export default AdminCreateUser;
