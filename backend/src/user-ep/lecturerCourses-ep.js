import {
  getLecturerSubjectsAndStudents,
  saveOrUpdateMarks,
} from "../dao/lecutureCourse-dao.js";

// Endpoint to fetch subjects and enrolled students
export const lecturerSubjectsWithEnrolledStudents = async (req, res) => {
  const { lecturerId } = req.params;

  try {
    const data = await getLecturerSubjectsAndStudents(lecturerId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Endpoint to save or update student marks
export const lecturerSaveAndUpdateMarks = async (req, res) => {
  const { lecturerId, subjectId, studentMarks } = req.body;

  try {
    const result = await saveOrUpdateMarks(
      {
        lecturerId,
        subjectId,
        studentMarks,
      },
      res
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
