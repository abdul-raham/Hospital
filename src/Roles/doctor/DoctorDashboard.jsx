import React from "react";
import Sidebar from "../../Roles/doctor/Sidebar/Sidebar.jsx";
import TopBar from "../../components/Common/Navbar/Toolbar.jsx";
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
import Appointments from "../doctor/DoctorAppointments.jsx";
import Patients from "../Patient/PatientDashboard.jsx";
import MessageInbox from "../Receptionist/MessageInbox.jsx";
import useAuth from "../../hooks/useAuth";
import "../doctor/DoctorDashboard.css";

const DoctorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();

  // Function to determine the title dynamically based on the route
  const getTitle = (path) => {
    switch (path) {
      case "/doctor/appointments":
        return "Appointments";
      case "/doctor/patients":
        return "Patients";
      case "/doctor/settings":
        return "Settings";
      default:
        return "Doctor Dashboard";
    }
  };

  const title = getTitle(location.pathname);

  // Example dynamic data (replace with API calls if necessary)
  const appointmentsCount = 35; // Replace with fetched appointment data
  const patientsCount = 120; // Replace with fetched patient data

  // Check authentication and role
  React.useEffect(() => {
    if (!loading && (!user || userRole !== "doctor")) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [user, userRole, loading, navigate, location]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* TopBar */}
        <TopBar title={title} />

        {/* Dashboard Overview Tiles */}
        <Grid container spacing={3} sx={{ mb: 3, marginTop: "5%" }}>
          {/* Appointments */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                boxShadow: 3,
                borderRadius: 2,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea component={Link} to="/doctor/appointments">
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ mb: 2, fontWeight: "bold" }}
                  >
                    Appointments
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    {appointmentsCount} Upcoming
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View and manage your scheduled appointments.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Patients */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                boxShadow: 3,
                borderRadius: 2,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea component={Link} to="/doctor/patients">
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ mb: 2, fontWeight: "bold" }}
                  >
                    Patients
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    {patientsCount} Active Patients
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Access detailed patient records and history.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Settings */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                boxShadow: 3,
                borderRadius: 2,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea component={Link} to="/doctor/settings">
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ mb: 2, fontWeight: "bold" }}
                  >
                    Settings
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Manage Preferences
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Update your profile and other settings.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        {/* Routes for dynamic content rendering */}
        <Routes>
          <Route
            path="/"
            element={<Typography variant="h5">Welcome Doctor</Typography>}
          />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
        </Routes>

        {/* Message Inbox */}
        <MessageInbox userId={user?.id || "doctorId123"} userType={userRole} />
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
