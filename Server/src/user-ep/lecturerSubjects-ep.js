import { saveOrUpdateMarks } from "../dao/studentMarks-dao.js";

export const lecturerSubjectsWithenrolledStudents = async (req, res) => {
  try {
    const { lecturerId } = req.params;

    const lecturer = await Lecturer.findById(lecturerId).populate(
      "teachingSubjects"
    );

    if (!lecturer)
      return res.status(404).json({ message: "Lecturer not found" });

    const enrolledStudents = await User.find({
      "enrolledCourses.course": {
        $in: lecturer.teachingSubjects.map((sub) => sub._id),
      },
    }).populate("enrolledCourses.course");

    res.json({ lecturer: lecturer.name, enrolledStudents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const lecturerSaveAndUpdateMarks = async (req, res) => {
  try {
    const { lecturerId } = req.params;
    const { studentId, marks } = req.body;

    // Verify if the lecturer has access to enter marks for the subject
    const lecturer = await Lecturer.findById(lecturerId).populate(
      "teachingSubjects"
    );

    if (!lecturer)
      return res.status(404).json({ message: "Lecturer not found" });

    // Check if lecturer teaches any of the subjects for which marks are being entered
    const lecturerSubjects = lecturer.teachingSubjects.map((sub) =>
      sub._id.toString()
    );
    for (let mark of marks) {
      if (!lecturerSubjects.includes(mark.subject)) {
        return res.status(403).json({
          message: `Lecturer not authorized to enter marks for subject ${mark.subject}`,
        });
      }
    }

    const updatedMarks = await saveOrUpdateMarks(studentId, marks);
    res.json({ message: "Marks updated successfully", updatedMarks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
