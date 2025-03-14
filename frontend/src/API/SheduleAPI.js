// services/scheduleAPI.js
const API_URL = process.env.API_URL || "http://localhost:8076/api/user";

// Fetch all events for a specific user
export const fetchEvents = async (userID) => {
  try {
    const response = await fetch(`${API_URL}/shedule/events/${userID}`); // Fixed route
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Create a new event
export const createEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_URL}/shedule/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error("Failed to create event");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// Update an existing event

// Update an existing event
export const updateEvent = async (eventID, eventData) => {
  try {
    const response = await fetch(`${API_URL}/shedule/events/${eventID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error("Failed to update event");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

// Delete an event
export const deleteEvent = async (eventID, userID) => {
  try {
    const response = await fetch(`${API_URL}/shedule/events/${eventID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID }), // Ensure userID is sent properly
    });
    if (!response.ok) {
      throw new Error("Failed to delete event");
    }
    return true; // Indicate success
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export default {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
