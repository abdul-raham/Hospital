import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { db } from "../../Firebase.js"; // Assuming Firebase is initialized here
import { collection, addDoc } from "firebase/firestore";

const ReceptionistAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    role: "Doctor",
    date: "",
    time: "",
    reason: "",
  });

  const handleAddAppointment = async () => {
    try {
      const docRef = await addDoc(
        collection(db, "appointments"),
        newAppointment
      );
      console.log("Document written with ID: ", docRef.id);
      setAppointments([...appointments, { ...newAppointment, id: docRef.id }]);
      setNewAppointment({
        patientName: "",
        role: "Doctor",
        date: "",
        time: "",
        reason: "",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Appointments
      </Typography>
      <Box component="form" sx={{ mb: 3, display: "flex", gap: 2 }}>
        <TextField
          label="Patient Name"
          value={newAppointment.patientName}
          onChange={(e) =>
            setNewAppointment({
              ...newAppointment,
              patientName: e.target.value,
            })
          }
        />
        <TextField
          label="Role"
          select
          value={newAppointment.role}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, role: e.target.value })
          }
        >
          <MenuItem value="Doctor">Doctor</MenuItem>
          <MenuItem value="Nurse">Nurse</MenuItem>
        </TextField>
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
          Add Appointment
        </Button>
      </Box>
      <List>
        {appointments.map((appt) => (
          <React.Fragment key={appt.id}>
            <ListItem>
              <Typography>
                {appt.role}: {appt.patientName} - {appt.date} at {appt.time}
                <br />
                Reason: {appt.reason}
              </Typography>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ReceptionistAppointments;
