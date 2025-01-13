import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { io } from "socket.io-client";
import { fetchAppointments, addAppointment } from "../../routes/Socket";  // Import socket functions

const socket = io("http://localhost:5000"); // Replace with your server URL

const ReceptionistAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ doctor: "", date: "", time: "" });

  // Fetch appointments and listen for updates
  useEffect(() => {
    fetchAppointments((data) => {
      const formattedData = Object.entries(data).map(([id, details]) => ({
        id,
        ...details,
      }));
      setAppointments(formattedData);
    });

    // Clean up listener
    return () => {
      socket.off("appointments");
    };
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    addAppointment(formData);
    setOpenModal(false);
    setFormData({ doctor: "", date: "", time: "" });
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ mb: 3, fontWeight: "bold", color: "#437cf8" }}
      >
        Appointments
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ backgroundColor: "#437cf8", mb: 3 }}
        onClick={() => setOpenModal(true)}
      >
        Add Appointment
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Doctor</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.doctor}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal to add appointment */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add New Appointment
          </Typography>
          <TextField
            label="Doctor"
            variant="outlined"
            fullWidth
            value={formData.doctor}
            onChange={handleChange}
            name="doctor"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date"
            variant="outlined"
            fullWidth
            value={formData.date}
            onChange={handleChange}
            name="date"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Time"
            variant="outlined"
            fullWidth
            value={formData.time}
            onChange={handleChange}
            name="time"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

// Modal Style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "300px",
};

export default ReceptionistAppointments;
