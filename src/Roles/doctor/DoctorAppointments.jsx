import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText, Divider, Button } from "@mui/material";
import axios from "axios";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments from the local API
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

  // Handle removing an appointment
  const handleRemove = (id) => {
    const updatedAppointments = appointments.filter((appt) => appt.id !== id);
    setAppointments(updatedAppointments);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Doctor's Appointments
      </Typography>
      <List>
        {appointments.map((appt) => (
          <React.Fragment key={appt.id}>
            <ListItem>
              <ListItemText
                primary={`${appt.patientName} - ${appt.date}`}
                secondary={`Time: ${appt.time} | Reason: ${appt.reason}`}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemove(appt.id)}
              >
                Remove
              </Button>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default DoctorAppointments;
