const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors"); // For allowing cross-origin requests

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend's URL
    methods: ["GET", "POST"],
  },
});

// Sample appointment data
let appointments = [
  { id: 1, patientName: "John Doe", date: "2024-12-01", time: "10:00 AM", reason: "Follow-up" },
  { id: 2, patientName: "Jane Smith", date: "2024-12-02", time: "1:00 PM", reason: "Checkup" },
];

// Middleware for logging requests (optional, for debugging)
app.use(cors());
app.use(express.json());

// Endpoint for serving appointment data
app.get("/appointments", (req, res) => {
  res.json(appointments);
});

// WebSocket connection handler
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Send existing appointments to the newly connected client
  socket.emit("appointments", appointments);

  // Listen for new appointments
  socket.on("addAppointment", (newAppointment) => {
    if (newAppointment.patientName && newAppointment.date && newAppointment.time && newAppointment.reason) {
      const addedAppointment = { ...newAppointment, id: appointments.length + 1 };
      appointments.push(addedAppointment);

      // Broadcast updated appointments to all clients
      io.emit("appointments", appointments);
      console.log("New appointment added:", addedAppointment);
    } else {
      console.error("Invalid appointment data:", newAppointment);
      socket.emit("error", "Invalid appointment data. All fields are required.");
    }
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = 3000; // Or your desired port
server.listen(PORT, () => {
  console.log(`WebSocket server is running on http://localhost:${PORT}`);
});
