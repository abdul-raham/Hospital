import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

// Custom Toolbar Component
const CustomToolbar = ({ label, onNavigate, onView }) => {
  return (
    <div className="custom-toolbar">
      <div className="navigation-buttons">
        {/* Back and Next buttons on one row */}
        <button onClick={() => onNavigate("PREV")}>&lt;</button>
        <button onClick={() => onNavigate("NEXT")}>&gt;</button>
      </div>
      <div className="view-buttons">
        {/* Day, Week, Month buttons on another row */}
        <button onClick={() => onView("day")}>Day</button>
        <button onClick={() => onView("week")}>Week</button>
        <button onClick={() => onView("month")}>Month</button>
      </div>
    </div>
  );
};

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const events = [
    { title: "Appointment 1", start: new Date(), end: new Date() },
    { title: "Appointment 2", start: new Date(), end: new Date() },
  ];

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}  // Only show Month, Week, and Day views
        defaultView="month"  // Default view is set to month
        style={{ height: 800, width: "100%", }}  // Adjust width and height as necessary
        components={{
          toolbar: CustomToolbar  // Use the custom toolbar
        }}
      />
    </div>
  );
};

export default MyCalendar;
