// controllers/enrollmentController.js

import Subjects from "../schema/courseSchema.js";
import User from "../schema/userSchema.js";

// Enroll a user in a courseexport const enrollInCourse = async (userId, courseCodes) => {
export const enrollInCourse = async (userId, courseCodes) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { error: "User not found." };
    }

    const enrolledCourses = [];
    const errors = [];

    for (const code of courseCodes) {
      const course = await Subjects.findOne({ courseCode: code });
      if (!course) {
        errors.push(`Course with code ${code} not found.`);
        continue;
      }

      // Check if the course is already enrolled
      const isAlreadyEnrolled = user.enrolledCourses.some(
        (enrolled) => enrolled.courseCode === code
      );

      if (isAlreadyEnrolled) {
        errors.push(`Already enrolled in course with code: ${code}`);
        continue;
      }

      const currentDate = new Date().toISOString().split("T")[0];

      // Add course details
      user.enrolledCourses.push({
        courseCode: code,
        enrolledDate: currentDate,
        passedStatus: false,
        eligibleStatus: true,
        attempts: 0,
      });

      enrolledCourses.push(course.courseName);
    }

    await user.save();

    const response = {
      success: enrolledCourses.length
        ? `Enrolled in courses: ${enrolledCourses.join(", ")}`
        : null,
      errors: errors.length ? errors : null,
    };

    return response;
  } catch (error) {
    return { error: error.message };
  }
};

// //////////////
// DELETE ENROLLED COURSES
// //////////////
export const deleteEnrolledCourses = async (userId, courseCodes) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { error: "User not found." };
    }

    const removedCourses = [];
    const errors = [];

    for (const code of courseCodes) {
      // Find the index of the course in enrolledCourses
      const index = user.enrolledCourses.findIndex(
        (enrolled) => enrolled.courseCode === code
      );

      if (index === -1) {
        errors.push(`Course with code ${code} is not enrolled.`);
        continue;
      }

      // Remove the course from the array
      const [removedCourse] = user.enrolledCourses.splice(index, 1);
      removedCourses.push(removedCourse.courseCode);
    }

    await user.save();

    const response = {
      success: removedCourses.length
        ? `Removed courses: ${removedCourses.join(", ")}`
        : null,
      errors: errors.length ? errors : null,
    };

    return response;
  } catch (error) {
    return { error: error.message };
  }
};
