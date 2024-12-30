import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import appointmentRoutes from "./routes/appointments.js";
import userRoutes from "./routes/userRoutes.js";

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);

// Login route (for authentication)
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  // Example login logic (you should replace this with actual validation)
  if (username === "admin" && password === "password123") {
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

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
