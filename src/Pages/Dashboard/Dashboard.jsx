// src/pages/Dashboard.js
import React from 'react';
import KPIs from './components/KPIs/KPIs';
import Graphs from './components/Graphs/Graphs';
import Notifications from './components/Notifications/Notifications';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h2>Hospital Dashboard</h2>
        {/* Add navigation links here */}
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* KPIs Section */}
        <div className="kpi-container">
          <KPIs />
        </div>

        {/* Graphs Section */}
        <div className="chart-container">
          <h2>Patient Admissions Over Time</h2>
          <Graphs />
        </div>

        {/* Notifications Section */}
        <div className="notification-container">
          <h2>Notifications</h2>
          <Notifications />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
