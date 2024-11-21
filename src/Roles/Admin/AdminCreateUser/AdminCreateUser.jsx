import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { createUser } from "../../../Firebase";  // Correct import

const AdminCreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");  // Add state for error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password, role);
      setEmail("");
      setPassword("");
      setRole("");
      setError("");  // Reset error if successful
    } catch (err) {
      setError(err.message);  // Display error message
    }
  };

  return (
    <Box sx={{ padding: 3, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Create New User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
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
        <TextField
          label="Role"
          variant="outlined"
          fullWidth
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Create User
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}  {/* Display error if any */}
    </Box>
  );
};

export default AdminCreateUser;
