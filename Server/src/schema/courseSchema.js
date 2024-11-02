import mongoose from "mongoose";

// Eligibility criteria schema for each subject
const eligibilityCriteriaSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'cat60_tma40', 'best_cat_avg_tma'
  cat: { type: String, required: true, enum: ["best", "average"] },
  tma: { type: String, required: true, enum: ["best", "average"] },
  lab: { type: String, required: false },
});

export const subjectSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  prerequisites: { type: [String] },
  semesters: { type: [Number], required: true },
  courseCoordinator: { type: String, required: true },
  credits: { type: Number, required: true },
  subjectLevel: { type: Number, required: true },
  compulsory: { type: Boolean, default: false },
  passedCreditsRequired: { type: Number, required: true },
  eligibilityCriteria: eligibilityCriteriaSchema, // Embed eligibility criteria here
  recommendedNextSubjects: { type: [String], default: [] },
});

const Subjects = mongoose.model("Course", subjectSchema);
export default Subjects;
