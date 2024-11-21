import React from "react";
import "./Table.css";

const Tables = () => {
  const tableData = [
    { name: "John Doe", appointment: "2024-12-01", status: "Pending" },
    { name: "Jane Smith", appointment: "2024-12-02", status: "Confirmed" },
    { name: "Michael Brown", appointment: "2024-12-03", status: "Cancelled" },
  ];

  return (
    <div className="table-container">
      <h2>Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Appointment Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.appointment}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
