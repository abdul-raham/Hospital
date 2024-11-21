import React from "react";
import { Grid, Card, CardContent, Typography, Paper } from "@mui/material";

const PatientList = ({ patients }) => {
  return (
    <Grid container spacing={3}>
      {patients.map((patient, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{patient.name}</Typography>
                <Typography variant="body2">Age: {patient.age}</Typography>
                <Typography variant="body2">Condition: {patient.condition}</Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default PatientList;
