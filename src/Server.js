const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http"); // Required for integrating Socket.IO
const { Server } = require("socket.io");
const appointmentRoutes = require("./routes/appointments");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/appointments", appointmentRoutes);

const PORT = 5000;

// Create an HTTP server and integrate it with the Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// Example Socket.IO logic
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  // Listen for 'fetchAppointments' event
  socket.on("fetchAppointments", () => {
    const appointments = [
      { id: 1, name: "John Doe", time: "10:00 AM" },
      { id: 2, name: "Jane Smith", time: "11:00 AM" },
    ];
    socket.emit("appointments", appointments); // Send data back to the client
  });

  // Listen for 'addAppointment' event
  socket.on("addAppointment", (appointment) => {
    console.log("New appointment received:", appointment);
    // Example: Broadcast the new appointment to all connected clients
    io.emit("appointments", [appointment]);
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start both the HTTP server and the WebSocket server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("WebSocket server is also active.");
});
