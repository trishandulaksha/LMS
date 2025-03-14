// components/Schedule.js
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "./schedule.css";
import { fetchEvents } from "../../API/SheduleAPI";
import { updateEvent } from "../../API/SheduleAPI";
import { createEvent } from "../../API/SheduleAPI";
import { deleteEvent } from "../../API/SheduleAPI";

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [editEventId, setEditEventId] = useState(null);
  const userID = sessionStorage.getItem("lms_user_id"); // Replace with the actual logged-in user's ID

  // Fetch events when the component mounts
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents(userID);
        const mappedEvents = data.map((event) => ({
          ...event,
          id: event._id, // Ensure ID compatibility
        }));
        setEvents(mappedEvents);
      } catch (error) {
        console.error("Failed to load events:", error);
      }
    };
    loadEvents();
  }, [userID]);

  // Handle date click to open the modal
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setEventName(""); // Reset event name for a new event
    setEditEventId(null);
    setShowModal(true);
  };

  // Handle event click to edit or delete
  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === info.event.id);
    if (event) {
      setEventName(event.title);
      setSelectedDate(event.start); // Ensure selectedDate is set correctly
      setEditEventId(event.id);
      setShowModal(true);
    }
  };

  // Save or update an event
  const handleSaveEvent = async () => {
    if (eventName.trim()) {
      try {
        const eventData = {
          title: eventName,
          start: selectedDate,
          allDay: true,
          userID,
        };

        if (editEventId) {
          // Update existing event
          const updatedEvent = await updateEvent(editEventId, eventData);
          setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event.id === editEventId
                ? { ...updatedEvent, id: updatedEvent._id }
                : event
            )
          );
        } else {
          // Create new event
          const newEvent = await createEvent(eventData);
          setEvents((prevEvents) => [
            ...prevEvents,
            { ...newEvent, id: newEvent._id },
          ]);
        }

        // Reset modal state
        setShowModal(false);
        setEventName("");
        setEditEventId(null);
      } catch (error) {
        console.error("Failed to save event:", error);
      }
    }
  };

  // Delete an event
  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(editEventId, userID);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== editEventId)
      );
      setShowModal(false);
      setEventName("");
      setEditEventId(null);
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
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
