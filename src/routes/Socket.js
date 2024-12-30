import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const fetchAppointments = (callback) => {
  socket.on("appointments", (data) => {
    callback(data);
  });
};

const addAppointment = (data) => {
  socket.emit("new-appointment", data);
};

export { fetchAppointments, addAppointment };
