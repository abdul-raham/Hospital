import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import "./Cards.css";

const Cards = () => {
  const cardData = [
    { title: "Patients", count: 40 },
    { title: "Doctors", count: 10 },
    { title: "Nurses", count: 20 },
    { title: "Appointments", count: 30 },
    { title: "Reports", count: 10 },
    { title: "Invoices", count: 20 },
  ];

  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 3 }}>
      {cardData.map((card, index) => (
        <Paper key={index} sx={{ padding: 2, width: "150px", textAlign: "center", boxShadow: 2, borderRadius: 2 }}>
          <Typography variant="h5" color="primary">
            {card.count}
          </Typography>
          <Typography variant="body2">{card.title}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Cards;
