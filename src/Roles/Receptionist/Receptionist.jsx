import React, { useState, useEffect } from "react";
import { Box, TextField, Button, List, ListItem, ListItemText, Divider } from "@mui/material";
import { io } from "socket.io-client";
 // Import socket.io-client

const socket = io("http://localhost:5173");

const ReceptionistAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    date: "",
    time: "",
    reason: "",
  });

  // Fetch existing appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/appointments.json"); // Adjust path if necessary
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Handle adding a new appointment
  const handleAddAppointment = () => {
    const updatedAppointments = [
      ...appointments,
      { ...newAppointment, id: appointments.length + 1 },
    ];

    // Emit the new appointment to the server
    socket.emit("addAppointment", newAppointment);

    setAppointments(updatedAppointments);
    setNewAppointment({ patientName: "", date: "", time: "", reason: "" });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Receptionist: Manage Appointments
      </Typography>
      <Box component="form" sx={{ mb: 3, display: "flex", gap: 2 }}>
        <TextField
          label="Patient Name"
          value={newAppointment.patientName}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, patientName: e.target.value })
          }
        />
        <TextField
          label="Date"
          type="date"
          value={newAppointment.date}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, date: e.target.value })
          }
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Time"
          value={newAppointment.time}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, time: e.target.value })
          }
        />
        <TextField
          label="Reason"
          value={newAppointment.reason}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, reason: e.target.value })
          }
        />
        <Button variant="contained" onClick={handleAddAppointment}>
          Add
        </Button>
      </Box>
      <List>
        {appointments.map((appt) => (
          <React.Fragment key={appt.id}>
            <ListItem>
              <ListItemText
                primary={`${appt.patientName} - ${appt.date}`}
                secondary={`Time: ${appt.time} | Reason: ${appt.reason}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ReceptionistAppointments;
