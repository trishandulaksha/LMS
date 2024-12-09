import { getEligibleSubjects } from "../dao/recomendSubject-dao";
import {
  getMarksByStudentId,
  saveOrUpdateMarks,
} from "../dao/studentMarks-dao";

// Controller for saving or updating marks
export const saveMarksEP = async (req, res) => {
  const { studentId, marks } = req.body;

  try {
    const savedMarks = await saveOrUpdateMarks(studentId, marks);
    res
      .status(200)
      .json({ success: "Marks saved successfully", data: savedMarks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get marks and eligible subjects for a student
export const getMarksAndEligibilityEP = async (req, res) => {
  const { studentId } = req.params;

  try {
    const studentMarks = await getMarksByStudentId(studentId);
    if (!studentMarks) {
      return res
        .status(404)
        .json({ error: "Marks not found for this student." });
    }

    // Fetch eligible subjects based on prerequisites and eligibility criteria
    const eligibleSubjects = await getEligibleSubjects(
      studentId,
      studentMarks.marks
    );
    res.status(200).json({ marks: studentMarks, eligibleSubjects });
  } catch (error) {
    res.status(500).json({ error: "Error fetching marks and eligibility." });
  }
};
