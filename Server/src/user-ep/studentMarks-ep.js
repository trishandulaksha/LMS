import { findMarksByStudentId } from "../dao/studentMark-dao.js";

// Controller to fetch marks for a specific student
export const getMarksByStudentId = async (req, res) => {
  try {
    const { studentID } = req.params;

    // Fetch marks by student ID using the DAO function
    const marksData = await findMarksByStudentId(studentID);

    if (!marksData || marksData.length === 0) {
      return res
        .status(404)
        .json({ message: "Marks not found for this student" });
    }

    return res.status(200).json(marksData);
  } catch (error) {
    console.error("Error in getMarksByStudentId:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
