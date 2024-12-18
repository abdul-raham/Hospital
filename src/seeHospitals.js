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
<<<<<<< HEAD:src/seedHospitals.js
      const hospitalData = await fetchHospitals();
      setHospitals(hospitalData);
    } catch (err) {
      console.error("Error loading hospitals:", err);
      setError("Failed to load hospitals. Please try again.");
    } finally {
=======
      const hospitalsCollection = collection(db, "hospitals"); // Points to the "Hospitals" collection
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
>>>>>>> 41ea5b4d545511c502cc2da6cce9b6c5a82b34ef:src/seeHospitals.js
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
<<<<<<< HEAD:src/seedHospitals.js
            <strong>Users:</strong>{" "}
=======
            Users: {" "}
>>>>>>> 41ea5b4d545511c502cc2da6cce9b6c5a82b34ef:src/seeHospitals.js
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