import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./schedule.css";

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [editEventId, setEditEventId] = useState(null); // To track the event being edited

  // Handle date click to open the modal
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setShowModal(true);
  };

  // Handle event click to edit or delete
  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === info.event.id);
    if (event) {
      setEventName(event.title);
      setEditEventId(event.id);
      setShowModal(true);
    }
  };

  // Add or update an event
  const handleSaveEvent = () => {
    if (eventName.trim()) {
      if (editEventId) {
        // Update existing event
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === editEventId ? { ...event, title: eventName } : event
          )
        );
      } else {
        // Add new event
        const newEvent = {
          id: String(events.length + 1), // Generate a unique ID
          title: eventName,
          start: selectedDate,
          allDay: true,
        };
        setEvents([...events, newEvent]);
      }
      setShowModal(false);
      setEventName("");
      setEditEventId(null);
    }
  };

  // Delete an event
  const handleDeleteEvent = () => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== editEventId)
    );
    setShowModal(false);
    setEventName("");
    setEditEventId(null);
  };

  return (
    <div className="z-10 min-h-screen p-8 bg-gray-100">
      <div className="container z-10 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">Schedule</h1>
        <div className="z-10 p-4 bg-white rounded-lg shadow-md">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            height="auto"
          />
        </div>
      </div>

      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              {editEventId ? "Edit Event" : "Add Event"}
            </h2>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Event Name"
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end space-x-4">
              {editEventId && (
                <button
                  onClick={handleDeleteEvent}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
              <button
                onClick={handleSaveEvent}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                {editEventId ? "Update" : "Save"}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEventName("");
                  setEditEventId(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
