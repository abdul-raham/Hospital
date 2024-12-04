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
import io from "socket.io-client";

const socket = io("http://localhost:5173"); // Replace with your server URL

const ReceptionistAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ doctor: "", date: "", time: "" });

  // Fetch appointments and listen for updates
  useEffect(() => {
    socket.on("appointments", (data) => {
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
    socket.emit("addAppointment", formData);
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

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Appointment
          </Typography>
          <TextField
            fullWidth
            label="Doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#437cf8" }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ReceptionistAppointments;
