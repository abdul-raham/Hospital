import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
import { fetchHospitals } from "./Firebase";

const SeeHospitals = () => {
  const [hospitals, setHospitals] = useState([]); // State to hold hospital data
  const [selectedHospital, setSelectedHospital] = useState(""); // Selected hospital state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch hospitals from Firestore
  const loadHospitals = async () => {
    try {
      const hospitalData = await fetchHospitals();
      setHospitals(hospitalData);
    } catch (err) {
      console.error("Error loading hospitals:", err);
      setError("Failed to load hospitals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHospitals(); // Fetch hospitals on component mount
  }, []);

  return (
    <Box sx={{ padding: 3, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Select a Hospital
      </Typography>

      {loading ? (
        <Typography>Loading hospitals...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TextField
          label="Hospitals"
          variant="outlined"
          fullWidth
          select
          value={selectedHospital}
          onChange={(e) => setSelectedHospital(e.target.value)}
          margin="normal"
        >
          {hospitals.map((hospital) => (
            <MenuItem key={hospital.id} value={hospital.id}>
              {hospital.name}
            </MenuItem>
          ))}
        </TextField>
      )}

      {selectedHospital && (
        <Box mt={2}>
          <Typography variant="body1">
            <strong>Selected Hospital ID:</strong> {selectedHospital}
          </Typography>
          <Typography variant="body2">
            <strong>Users:</strong>{" "}
            {hospitals
              .find((hospital) => hospital.id === selectedHospital)
              ?.users.join(", ") || "No users available"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SeeHospitals;
