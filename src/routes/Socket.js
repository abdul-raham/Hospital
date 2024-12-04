import { io } from "socket.io-client";

const socket = io("http://localhost:5173"); // Replace with your backend URL

export const fetchAppointments = (callback) => {
  socket.on("appointments", callback);
};

export const addAppointment = (appointment) => {
  socket.emit("addAppointment", appointment);
};

export default socket;
