import React from "react";
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
    <div className="cards">
      {cardData.map((card, index) => (
        <div key={index} className="card">
          <h2>{card.count}</h2>
          <p>{card.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
