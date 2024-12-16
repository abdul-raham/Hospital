import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
import { db } from "./Firebase"; // Ensure Firebase is imported correctly
import { collection, getDocs } from "firebase/firestore";

const SeeHospitals = () => {
  const [hospitals, setHospitals] = useState([]); // State to hold hospital data
  const [selectedHospital, setSelectedHospital] = useState(""); // Selected hospital state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch hospitals from Firestore
  const fetchHospitals = async () => {
    try {
      const hospitalsCollection = collection(db, "Hospitals"); // Points to the "Hospitals" collection
      const querySnapshot = await getDocs(hospitalsCollection);

      // Map through documents to extract hospital names and users
      const hospitalList = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID
        name: doc.data().name, // Hospital name
        users: doc.data().users || [], // Optional users array
      }));

      console.log("Fetched Hospitals: ", hospitalList); // Debugging: Log fetched hospitals
      setHospitals(hospitalList); // Update the state
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error fetching hospitals: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals(); // Trigger fetch on component mount
  }, []);

  return (
    <Box sx={{ padding: 3, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Select a Hospital
      </Typography>

      {loading ? (
        <Typography>Loading hospitals...</Typography>
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
          {/* Map the hospitals to the dropdown */}
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
            Selected Hospital ID: {selectedHospital}
          </Typography>
          <Typography variant="body2">
            Users:{" "}
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
