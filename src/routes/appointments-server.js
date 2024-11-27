const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let appointments = [
  {
    id: 1,
    patientName: "John Doe",
    date: "2024-12-01",
    time: "10:00 AM",
    reason: "Follow-up",
    assignedTo: "nurse",
    status: "Pending",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    date: "2024-12-02",
    time: "1:00 PM",
    reason: "Checkup",
    assignedTo: "nurse",
    status: "Pending",
  },
];

app.use(cors());
app.use(express.json());

app.get("/appointments", (req, res) => {
  res.json(appointments);
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.emit("appointments", appointments);

  socket.on("addAppointment", (newAppointment) => {
    if (
      newAppointment.patientName &&
      newAppointment.date &&
      newAppointment.time &&
      newAppointment.reason
    ) {
      const addedAppointment = {
        ...newAppointment,
        id: appointments.length + 1,
        assignedTo: "nurse",
        status: "Pending",
      };
      appointments.push(addedAppointment);
      io.emit("appointments", appointments);
    } else {
      socket.emit(
        "error",
        "Invalid appointment data. All fields are required."
      );
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = 5173;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on http://localhost:${PORT}`);
});
