import mongoose from "mongoose";

const studentDetailsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  level: { type: String, required: true },
  completedSubjects: { type: Number, default: 0 },
  totalYears: { type: Number, default: 4 },
  currentYear: { type: Number, default: 1 },
  progressYear: { type: Number, default: 0 },
  passedSubjects: { type: Number, default: 0 },
  failedSubjects: { type: Number, default: 0 },
  status: { type: String, default: "Pending" },
});

const StudentDetails = mongoose.model("StudentDetails", studentDetailsSchema);

export default StudentDetails;