import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import appointmentRoutes from "./routes/appointments.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "../Backend/Auth/firebaseAuth.js"; // Import the auth routes

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// CORS setup to allow frontend access from a specific origin
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST"]
}));

// Routes for API
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);

// Authentication routes
app.use("/api/auth", authRoutes); // Use the auth routes here

// Create HTTP server & integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend origin URL (adjust if needed)
    methods: ["GET", "POST"],
  },
});

// Example Socket.IO logic
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("fetchAppointments", () => {
    const appointments = [
      { id: 1, name: "John Doe", time: "10:00 AM" },
      { id: 2, name: "Jane Smith", time: "11:00 AM" },
    ];
    socket.emit("appointments", appointments); // Send to the specific client
  });

  socket.on("addAppointment", (appointment) => {
    console.log("Appointment received:", appointment);
    io.emit("appointments", [appointment]); // Broadcast to all connected clients
  });

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
