import Subjects from "../schema/courseSchema.js";

// Bulk create subjects
export const bulkCreateSubjects = async (subjectsArray) => {
  try {
    // Insert all subjects at once using insertMany
    return await Subjects.insertMany(subjectsArray);
  } catch (error) {
    throw new Error("Error bulk inserting subjects");
  }
};

// Fetch all subjects
export const getAllSubjects = async () => {
  try {
    return await Subjects.find();
  } catch (error) {
    throw new Error("Error fetching subjects");
  }
};

// Fetch a subject by ID
export const getSubjectById = async (courseCode) => {
  try {
    return await Subjects.findOne({ courseCode });
  } catch (error) {
    throw new Error("Error fetching subject by ID");
  }
};

// Create a new subject
export const createSubject = async (data) => {
  try {
    const newSubject = new Subjects(data);
    return await newSubject.save();
  } catch (error) {
    throw new Error("Error creating subject");
  }
};

// Update a subject
export const updateSubject = async (courseCode, updateData) => {
  try {
    return await Subjects.findOneAndUpdate({ courseCode }, updateData, {
      new: true,
    });
  } catch (error) {
    throw new Error("Error updating subject");
  }
};

// Delete a subject
export const deleteSubject = async (courseCode) => {
  try {
    return await Subjects.findOneAndDelete({ courseCode });
  } catch (error) {
    throw new Error("Error deleting subject");
  }
};
