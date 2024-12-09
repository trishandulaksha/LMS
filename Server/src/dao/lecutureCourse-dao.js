import User from "../schema/userSchema.js";
import Lecturer from "../schema/lecturerSchema.js";
import Marks from "../schema/markSchema.js";
import mongoose from "mongoose";

export const getCoursesWithStudentDetails = async (lecturerEmail) => {
  try {
    const lecturer = await Lecturer.findOne({ email: lecturerEmail }).populate(
      "teachingSubjects"
    );

    if (!lecturer) {
      return { error: "Lecturer not found" };
    }

    const courses = lecturer.teachingSubjects;

    const courseDetails = await Promise.all(
      courses.map(async (course) => {
        const enrolledStudents = await User.find({
          "enrolledCourses.courseCode": course.courseCode,
        });

        const studentCategories = await Promise.all(
          enrolledStudents.map(async (student) => {
            try {
              // Ensure that student.studentId is valid before querying
              if (!student.studentId) {
                console.log(
                  `Student ID is missing for student: ${student.name}`
                );
                return {
                  studentId: student.studentId,
                  name: student.name,
                  category: "Pending",
                  marks: {},
                };
              }

              // Fetch student record using studentId
              const studentRecord = await User.findOne({
                studentId: student.studentId,
              });

              if (!studentRecord) {
                console.log(`Student not found: ${student.studentId}`);
                return {
                  studentId: student.studentId,
                  name: student.name,
                  category: "Pending",
                  marks: {},
                };
              }

              // Ensure studentRecord._id is valid
              if (
                !studentRecord._id ||
                !mongoose.Types.ObjectId.isValid(studentRecord._id)
              ) {
                console.log(
                  `Invalid ObjectId for student ${student.studentId}`
                );
                return {
                  studentId: student.studentId,
                  name: student.name,
                  category: "Error",
                  marks: {},
                };
              }

              // Fetch marks record for the student
              const marksRecord = await Marks.findOne({
                student: mongoose.Types.ObjectId(studentRecord._id),
              });

              if (!marksRecord) {
                console.log(
                  `No marks record found for student: ${student.studentId}`
                );
                return {
                  studentId: student.studentId,
                  name: student.name,
                  category: "Pending",
                  marks: {},
                };
              }

              // Check if marks exist for the specific course
              const subjectMarks = marksRecord.marks.find(
                (mark) => mark.subject.toString() === course._id.toString()
              );

              if (!subjectMarks) {
                console.log(
                  `No marks found for student ${student.studentId} in course ${course.courseCode}`
                );
                return {
                  studentId: student.studentId,
                  name: student.name,
                  category: "Pending",
                  marks: {},
                };
              }

              // Determine category based on marks
              let category = "Pending"; // Default to "Pending"
              if (subjectMarks.passed) {
                category = "Eligible";
              } else if (subjectMarks.isEligibleForFinal) {
                category = "Resit";
              } else {
                category = "Repeated";
              }

              return {
                studentId: student.studentId,
                name: student.name,
                category,
                marks: subjectMarks,
              };
            } catch (err) {
              console.error(
                `Error processing student ${student.studentId}:`,
                err
              );
              return {
                studentId: student.studentId,
                name: student.name,
                category: "Error",
                marks: {},
              };
            }
          })
        );

        return {
          courseCode: course.courseCode,
          courseName: course.courseName,
          students: studentCategories,
        };
      })
    );

    return { success: courseDetails };
  } catch (error) {
    console.error("Error fetching course details:", error);
    return { error: error.message };
  }
};
