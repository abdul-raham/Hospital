import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

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
        style={{ height: 400, width: "100%" }}
      />
    </div>
  );
};

export default MyCalendar;
