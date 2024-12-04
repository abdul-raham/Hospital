import React from "react";
import { Button, TextField, Grid, Container, Typography, Box } from "@mui/material";
import "./pages/HomePage/HomePage.css";

const Homepage = () => {
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Header Section */}
      <Box className="header" sx={{ padding: 4, textAlign: "center", color: "white" }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Care Master Hospital
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Your Health, Our Priority
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => scrollToSection("contact")}
        >
          Get in Touch
        </Button>
      </Box>

      {/* Navigation Buttons */}
      <Box className="nav-buttons" sx={{ display: "flex", justifyContent: "center", gap: 2, padding: 2 }}>
        <Button variant="text" onClick={() => scrollToSection("about")}>
          About Us
        </Button>
        <Button variant="text" onClick={() => scrollToSection("services")}>
          Our Services
        </Button>
        <Button variant="text" onClick={() => scrollToSection("contact")}>
          Contact
        </Button>
      </Box>

      {/* About Us Section */}
      <Box id="about" sx={{ padding: 4, backgroundColor: "#f9f9f9" }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1">
            At Care Master Hospital, we are dedicated to providing top-quality healthcare services with compassion
            and excellence. Our team of expert doctors, nurses, and staff ensure that every patient receives
            personalized care and attention.
          </Typography>
        </Container>
      </Box>

      {/* Services Section */}
      <Box id="services" sx={{ padding: 4 }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Our Services
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Outpatient Services</Typography>
              <Typography variant="body2">
                Comprehensive diagnosis and treatment for a wide range of conditions.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Surgical Procedures</Typography>
              <Typography variant="body2">
                State-of-the-art operating rooms for minor and major surgeries.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Emergency Care</Typography>
              <Typography variant="body2">
                24/7 emergency services to handle critical cases with urgency.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Pediatric Services</Typography>
              <Typography variant="body2">
                Specialized care for children’s health and development.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Us Section */}
      <Box id="contact" sx={{ padding: 4, backgroundColor: "#f9f9f9" }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            Feel free to reach out to us with any questions or appointment requests. We’re here to help!
          </Typography>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Name"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Email"
                  type="email"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box className="footer" sx={{ padding: 2, textAlign: "center", backgroundColor: "#3f51b5", color: "white" }}>
        <Typography variant="body2">© 2024 Care Master Hospital. All Rights Reserved.</Typography>
      </Box>
    </div>
  );
};

export default Homepage;
