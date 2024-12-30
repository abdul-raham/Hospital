import express from "express";

const router = express.Router();

// Simulated database (replace this with real database logic)
let appointments = [
  { id: 1, name: "John Doe", time: "10:00 AM" },
  { id: 2, name: "Jane Smith", time: "11:00 AM" },
];

// Fetch appointments
router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: appointments });
});

// Add a new appointment
router.post("/", (req, res) => {
  const newAppointment = req.body;
  newAppointment.id = appointments.length + 1; // Simulate auto-increment ID
  appointments.push(newAppointment);

  res.status(201).json({ success: true, data: newAppointment });
});

export default router;
