// File: backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const appointmentRoutes = require("./routes/appointments");
const userRoutes = require("./routes/userRoutes");

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);

// Create HTTP server & integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend origin URL
    methods: ["GET", "POST"],
  },
});

// Example Socket.IO logic
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  // Example: Fetch appointments
  socket.on("fetchAppointments", () => {
    const appointments = [
      { id: 1, name: "John Doe", time: "10:00 AM" },
      { id: 2, name: "Jane Smith", time: "11:00 AM" },
    ];
    socket.emit("appointments", appointments);
  });

  // Example: When a new appointment is added
  socket.on("addAppointment", (appointment) => {
    console.log("Appointment received:", appointment);
    io.emit("appointments", [appointment]); // Broadcast to all connected clients
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("WebSocket server is also active.");
});
