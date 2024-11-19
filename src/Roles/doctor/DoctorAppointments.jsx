import React from 'react';
import './styles.css';

const DoctorDashboard = () => {
  return (
    <div className="doctor-dashboard">
      <header>
        <h1>Doctor Dashboard</h1>
      </header>
      <section className="dashboard-content">
        <div className="card">
          <h2>Appointments</h2>
          <p>View and manage your scheduled appointments.</p>
        </div>
        <div className="card">
          <h2>Patient Records</h2>
          <p>Access detailed patient records and history.</p>
        </div>
      </section>
    </div>
  );
};

export default DoctorDashboard;