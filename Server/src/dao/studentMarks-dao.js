import Marks from "../schema/markSchema.js";
import User from "../schema/userSchema.js";

// Save or Update Marks for a Student
export const saveOrUpdateMarks = async (studentId, marks) => {
  try {
    const student = await User.findById(studentId).populate(
      "enrolledCourses.course"
    );

    if (!student) throw new Error("Student not found.");

    marks.forEach((mark) => {
      const enrolledCourse = student.enrolledCourses.find(
        (enrollment) => enrollment.course.toString() === mark.subject.toString()
      );

      if (!enrolledCourse)
        throw new Error(`Student is not enrolled in subject ${mark.subject}`);
      if (!enrolledCourse.enrollmentDate)
        throw new Error(`No enrollment date for subject ${mark.subject}`);

      // Check if the enrollment is still valid based on the enrollment date
      const enrollmentYear = enrolledCourse.enrollmentDate.getFullYear();
      const currentYear = new Date().getFullYear();
      const validityPeriod = enrolledCourse.isRepeat ? 1 : 2;
      if (currentYear - enrollmentYear > validityPeriod) {
        throw new Error(
          `Enrollment in subject ${mark.subject} is no longer valid.`
        );
      }
    });

    // Proceed to save or update marks
    let studentMarks = await Marks.findOne({ student: studentId });
    studentMarks = studentMarks
      ? studentMarks
      : new Marks({ student: studentId, marks });

    studentMarks.marks = marks.map((mark) => ({
      ...mark,
      enrollmentDate: student.enrolledCourses.find(
        (enrollment) => enrollment.course.toString() === mark.subject.toString()
      ).enrollmentDate,
    }));

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
