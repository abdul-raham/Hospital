import React, { useEffect, useState } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch appointments from the backend
    axios.get('http://localhost:5000/api/appointments')
      .then(response => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Appointments</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Doctor ID</strong></TableCell>
              <TableCell><strong>Patient ID</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Reason</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map(appointment => (
              <TableRow key={appointment._id}>
                <TableCell>{new Date(appointment.date).toLocaleString()}</TableCell>
                <TableCell>{appointment.doctorId}</TableCell>
                <TableCell>{appointment.patientId}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>{appointment.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default Appointments;
