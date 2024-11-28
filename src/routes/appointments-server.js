const admin = require("firebase-admin");
const { Server } = require("socket.io");

// Firebase Admin Initialization
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://<your-database-name>.firebaseio.com",
});

const db = admin.database();
const appointmentsRef = db.ref("appointments");

// Socket.IO Server Initialization
const io = new Server(3000, {
  cors: {
    origin: "*", // Replace with allowed origins
  },
});

// Listen for Firebase changes and broadcast to clients
appointmentsRef.on("value", (snapshot) => {
  const appointments = snapshot.val();
  io.emit("appointments", appointments); // Send updated appointments to clients
});

// Handle client connections
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Handle appointment addition
  socket.on("addAppointment", (newAppointment) => {
    const newAppointmentRef = appointmentsRef.push();
    newAppointmentRef.set(newAppointment, (error) => {
      if (error) {
        socket.emit("error", "Failed to save appointment.");
      } else {
        socket.emit("success", "Appointment added successfully.");
      }
    });
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});
