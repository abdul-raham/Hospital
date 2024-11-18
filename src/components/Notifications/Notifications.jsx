import React from 'react';
import KPIs from '../components/KPIs';
import Graphs from '../components/Graphs';
import Notifications from '../components/Notifications';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Hospital Management Dashboard</h1>
      <KPIs />
      <Graphs />
      <Notifications />
    </div>
  );
};

export default Dashboard;
