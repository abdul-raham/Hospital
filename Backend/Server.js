import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import appointmentRoutes from "../src/routes/appointments.js";
import userRoutes from "../src/routes/userRoutes.js";
import authRoutes from "./Auth/firebaseAuth.js"; // Import the auth routes

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// CORS setup to allow frontend access from a specific origin
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"],
  })
);

// Default route to confirm server is running
app.get("/", (req, res) => {
  res.send("Server is running! Use the API endpoints.");
});

// Routes for API
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); // Use the auth routes here

// Create HTTP server & integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend origin URL (adjust if needed)
    methods: ["GET", "POST"],
  },
});

// Listen for socket connections and handle events
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle appointment-related events here
  socket.on("create-appointment", (appointmentData) => {
    // Emit event to notify other clients (e.g., for new appointment)
    io.emit("new-appointment", appointmentData);
    console.log("New appointment received", appointmentData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// 404 Error Middleware
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// General Error Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("WebSocket server is also active.");
});
