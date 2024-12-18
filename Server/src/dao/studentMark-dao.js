import Marks from "../schema/markSchema.js";

// Function to fetch marks by student ID
export const findMarksByStudentId = async (studentID) => {
  try {
    const marksData = await Marks.find({ student: studentID })
      .populate("marks.subject", "courseName") // Populate subject name
      .exec();

    return marksData;
  } catch (error) {
    console.error("Error fetching marks by student ID:", error);
    throw error;
  }
};
