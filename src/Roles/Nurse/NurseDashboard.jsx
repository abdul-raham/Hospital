import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import TopBar from "../../components/Common/Navbar/Toolbar.jsx";
import Sidebar from "../../Roles/Nurse/NurseSidebar/NurseSidebar.jsx";
import NurseAppointments from "../Nurse/NurseAppointment/NurseAppointments.jsx";
import Patients from "../Patient/PatientDashboard.jsx";
import NurseTasks from "./NurseTasks.jsx";
import CarePlans from "./CarePlans.jsx";
import MessageInbox from "../Receptionist/MessageInbox.jsx";
import { fetchAppointments } from "../../routes/Socket"; // Importing named export fetchAppointments
import useAuth from "../../hooks/useAuth";
import "./NurseDashboard.css";

const NurseDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userRole, loading } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [carePlansCount, setCarePlansCount] = useState(0); // Example dynamic data
  const [tasksCount, setTasksCount] = useState(0); // Example dynamic data

  // Dynamically set the page title based on the route
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

  // Check authentication and role
  useEffect(() => {
    if (!loading && (!user || userRole !== "nurse")) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [user, userRole, loading, navigate, location]);

  // Fetch appointments using socket.io
  useEffect(() => {
    fetchAppointments((updatedAppointments) => {
      setAppointments(updatedAppointments);
    });

    // No need to clean up socket listener in this case since fetchAppointments
    // directly triggers a callback and doesn't leave lingering listeners.
  }, []);

  // Simulate dynamic data for tasks and care plans
  useEffect(() => {
    setTasksCount(10); // Example static count, replace with API call if needed
    setCarePlansCount(5); // Example static count, replace with API call if needed
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box className="nurse-dashboard">
      <Sidebar />
      <Box className="main-content">
        <TopBar title={title} />
        <Grid
          container
          spacing={3}
          className="dashboard-tiles"
          sx={{ marginTop: "5%" }}
        >
          {/* Appointment Tile */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="tile">
              <CardActionArea component={Link} to="/nurse/appointments">
                <CardContent>
                  <Typography variant="h5">Appointments</Typography>
                  <Typography variant="h6" color="primary">
                    {appointments.length > 0
                      ? `${appointments.length} Upcoming`
                      : "No Appointments"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    View and manage your scheduled appointments.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Patients Tile */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="tile">
              <CardActionArea component={Link} to="/nurse/patients">
                <CardContent>
                  <Typography variant="h5">Patients</Typography>
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

          {/* Tasks Tile */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="tile">
              <CardActionArea component={Link} to="/nurse/tasks">
                <CardContent>
                  <Typography variant="h5">Tasks</Typography>
                  <Typography variant="h6" color="primary">
                    {tasksCount} Active Tasks
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Manage your assigned tasks efficiently.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Care Plans Tile */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="tile">
              <CardActionArea component={Link} to="/nurse/careplans">
                <CardContent>
                  <Typography variant="h5">Care Plans</Typography>
                  <Typography variant="h6" color="primary">
                    {carePlansCount} Plans Available
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Access and manage patient care plans.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        {/* Routes for Nurse Dashboard */}
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

        {/* Message Inbox */}
        <MessageInbox userId={user.id} userType={userRole} />
      </Box>
    </Box>
  );
};

export default NurseDashboard;
