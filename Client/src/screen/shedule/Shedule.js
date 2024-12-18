import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./schedule.css";

const Schedule = () => {
  const [events, setEvents] = useState([]);

  const handleDateClick = (info) => {
    const eventName = prompt("Enter event name:");
    if (eventName) {
      setEvents([
        ...events,
        { title: eventName, start: info.dateStr, allDay: true },
      ]);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">Shedule</h1>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            height="auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
