import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import TopBar from "../../components/Common/Navbar/Toolbar.jsx";
import Sidebar from "../../Roles/Nurse/NurseSidebar/NurseSidebar.jsx";
import NurseAppointments from "../Nurse/NurseAppointment/NurseAppointments.jsx";
import Patients from "../Patient/PatientDashboard.jsx";
import NurseTasks from "./NurseTasks.jsx";
import CarePlans from "./CarePlans.jsx";
import Header from "../Nurse/Header/Header.jsx";
import { io } from "socket.io-client";
import "./NurseDashboard.css";
import MessageInbox from "../Receptionist/MessageInbox.jsx";

const NurseDashboard = () => {
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);

  const getTitle = (path) => {
    switch (path) {
      case "/nurse/appointments":
        return "Appointments";
      case "/nurse/patients":
        return "Patients";
      case "/nurse/tasks":
        return "Tasks";
      case "/nurse/careplans":
        return "Care Plans";
      default:
        return "Nurse Dashboard";
    }
  };

  const title = getTitle(location.pathname);

  useEffect(() => {
    const socket = io("http://localhost:5173"); // Use backend URL
    socket.on("appointments", (updatedAppointments) => {
      setAppointments(updatedAppointments);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const NurseDashboard = () => {
    const userId = "nurseId123"; // Replace with logged-in nurse's ID
    const userType = "nurse";

    return (
      <Box>
        <TopBar title="Nurse Dashboard" />
        <MessageInbox userId={userId} userType={userType} />
      </Box>
    );
  };
  return (
    <Box className="nurse-dashboard">
      <Header className="header" />
      <Sidebar className="sidebar" />
      <Box className="main-content">
        <TopBar title={title} className="top-bar" />
        <Grid
          container
          spacing={3}
          className="dashboard-tiles"
          sx={{ marginTop: "5%" }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Card className="tile">
              <CardActionArea component={Link} to="/nurse/appointments">
                <CardContent>
                  <Typography variant="h5" component="div">
                    Appointments
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {appointments.length} Upcoming
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    View and manage your scheduled appointments.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="tile">
              <CardActionArea component={Link} to="/nurse/patients">
                <CardContent>
                  <Typography variant="h5" component="div">
                    Patients
                  </Typography>
                  <Typography variant="h6" color="primary">
                    120 Active Patients
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Access detailed patient records and history.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="tile">
              <CardActionArea component={Link} to="/nurse/tasks">
                <CardContent>
                  <Typography variant="h5" component="div">
                    Tasks
                  </Typography>
                  <Typography variant="h6" color="primary">
                    Manage Tasks
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    View, manage, and update your assigned tasks efficiently.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Routes>
          <Route
            path="/"
            element={
              <Typography variant="h5">Welcome to your dashboard!</Typography>
            }
          />
          <Route
            path="appointments"
            element={<NurseAppointments appointments={appointments} />}
          />
          <Route path="patients" element={<Patients />} />
          <Route path="tasks" element={<NurseTasks />} />
          <Route path="careplans" element={<CarePlans />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default NurseDashboard;
