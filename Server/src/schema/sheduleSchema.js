import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  allDay: {
    type: Boolean,
    default: true,
  },
  userID: {
    type: String, // Store the custom user ID as a string
    required: true,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
