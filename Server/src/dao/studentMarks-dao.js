import Marks from "../schema/markSchema.js";
import User from "../schema/userSchema.js";

// Save or Update Marks for a Student
export const saveOrUpdateMarks = async (studentId, marks) => {
  try {
    // Fetch the student data to get their enrolled subjects
    const student = await User.findById(studentId).populate("enrolledSubjects");

    if (!student) {
      throw new Error("Student not found.");
    }

    // Check if the student is enrolled in each subject provided in the marks array
    for (const mark of marks) {
      const isEnrolled = student.enrolledSubjects.some(
        (subject) => subject.toString() === mark.subject.toString()
      );

      if (!isEnrolled) {
        throw new Error(
          `Student is not enrolled in subject with ID: ${mark.subject}`
        );
      }
    }

    // Proceed to save or update marks if the student is enrolled in all subjects
    let studentMarks = await Marks.findOne({ student: studentId });

    if (!studentMarks) {
      // If no marks entry exists for the student, create a new entry
      studentMarks = new Marks({ student: studentId, marks });
    } else {
      // Update existing marks for the student
      studentMarks.marks = marks;
    }

    return await studentMarks.save();
  } catch (error) {
    throw new Error("Error saving or updating marks: " + error.message);
  }
};

// Fetch Marks for a Student
export const getMarksByStudentId = async (studentId) => {
  try {
    return await Marks.findOne({ student: studentId }).populate(
      "marks.subject"
    );
  } catch (error) {
    throw new Error("Error fetching marks for student: " + error.message);
  }
};
