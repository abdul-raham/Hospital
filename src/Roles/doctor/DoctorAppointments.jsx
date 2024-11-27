import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { db } from "../../Firebase"; // Assuming Firebase is initialized here
import { collection, query, where, onSnapshot } from "firebase/firestore";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "appointments"),
      where("role", "==", "Doctor")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointmentsData = [];
      querySnapshot.forEach((doc) => {
        appointmentsData.push({ ...doc.data(), id: doc.id });
      });
      setAppointments(appointmentsData);
    });

    return () => unsubscribe();
  }, []);

  const handleRemove = (id) => {
    // Handle removing appointments (e.g., by calling a Firebase function to delete)
    console.log("Remove appointment with ID:", id);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Doctor's Appointments
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.id}>
                <TableCell>{appt.patientName}</TableCell>
                <TableCell>{appt.date}</TableCell>
                <TableCell>{appt.time}</TableCell>
                <TableCell>{appt.reason}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemove(appt.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DoctorAppointments;
