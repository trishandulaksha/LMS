// routes/scheduleRoutes.js
import express from "express";
import ScheduleDAO from "../dao/shedule-dao.js";
const router = express.Router();

// Create a new event
export const AddEvent = async (req, res) => {
  try {
    const { title, start, allDay, userID } = req.body;
    const eventData = { title, start, allDay, userID };
    const newEvent = await ScheduleDAO.createEvent(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Failed to create event", error });
  }
};

export const getAllEvent = async (req, res) => {
  try {
    const { userID } = req.params;
    const events = await ScheduleDAO.getEventsByUser(userID);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error });
  }
};

export const UpdateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { userID, title, start, allDay } = req.body;
    const updateData = { title, start, allDay };
    const updatedEvent = await ScheduleDAO.updateEvent(id, userID, updateData);
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Failed to update event", error });
  }
};

export const DeleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { userID } = req.body;
    const deletedEvent = await ScheduleDAO.deleteEvent(id, userID);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error });
  }
};
