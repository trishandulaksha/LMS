// dao/scheduleDAO.js

import Schedule from "../schema/sheduleSchema.js";

class ScheduleDAO {
  // Create a new event
  static async createEvent(eventData) {
    const event = new Schedule(eventData);
    return await event.save();
  }

  // Get all events for a specific user
  static async getEventsByUser(userID) {
    return await Schedule.find({ userID });
  }

  // Update an event by ID and userID
  static async updateEvent(id, userID, updateData) {
    return await Schedule.findOneAndUpdate({ _id: id, userID }, updateData, {
      new: true,
    });
  }

  // Delete an event by ID and userID
  static async deleteEvent(id, userID) {
    return await Schedule.findOneAndDelete({ _id: id, userID });
  }
}

export default ScheduleDAO;
