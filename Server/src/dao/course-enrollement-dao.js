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

    for (const code of courseCodes) {
      const course = await Subjects.findOne({ courseCode: code });
      if (!course) {
        return { error: `Course with code ${code} not found.` };
      }

      // Check if already enrolled
      if (
        user.enrolledCourses.some((c) => c.toString() === course._id.toString())
      ) {
        return { error: `Already enrolled in course: ${course.courseName}` };
      }

      // Add course to user's enrolled courses
      user.enrolledCourses.push(course._id);
      enrolledCourses.push(course.courseName);
    }

    await user.save();

    return { success: `Enrolled in courses: ${enrolledCourses.join(", ")}` };
  } catch (error) {
    return { error: error.message };
  }
};
