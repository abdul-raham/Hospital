const express = require('express');
const router = express.Router();

// Mock database
let appointments = [];

// Get all appointments
router.get('/', (req, res) => {
  res.json(appointments);
});

// Get a specific appointment
router.get('/:id', (req, res) => {
  const appointment = appointments.find(a => a.id === parseInt(req.params.id));
  if (appointment) {
    res.json(appointment);
  } else {
    res.status(404).send("Appointment not found");
  }
});

// Create a new appointment
router.post('/', (req, res) => {
  const newAppointment = {
    id: appointments.length + 1,
    ...req.body,
  };
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

// Update an appointment
router.put('/:id', (req, res) => {
  const index = appointments.findIndex(a => a.id === parseInt(req.params.id));
  if (index !== -1) {
    appointments[index] = { id: parseInt(req.params.id), ...req.body };
    res.json(appointments[index]);
  } else {
    res.status(404).send("Appointment not found");
  }
});

// Delete an appointment
router.delete('/:id', (req, res) => {
  const index = appointments.findIndex(a => a.id === parseInt(req.params.id));
  if (index !== -1) {
    appointments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Appointment not found");
  }
});

module.exports = router;
