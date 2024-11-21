import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Cards from "./Cards/Cards";
import Tables from "./Tables/Table";
import MyCalendar from "./Calendar/Calendar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Header title="Admin Dashboard" />
        <Cards />
        <div className="dashboard-section">
          <Tables />
          <MyCalendar />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
