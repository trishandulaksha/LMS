// controllers/enrollmentController.js

import Subjects from "../schema/courseSchema.js";
import Marks from "../schema/markSchema.js";
import User from "../schema/userSchema.js";
import mongoose from "mongoose";

// //////////////
// SAVE ENROLLED COURSES
// //////////////

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

      const currentDate = new Date();

      // Check if the user is already enrolled in the course
      const alreadyEnrolled = user.enrolledCourses.some(
        (enrolled) => enrolled.courseCode === code
      );

      if (alreadyEnrolled) {
        errors.push(`Already enrolled in course with code: ${code}`);
        continue;
      }

      // Update the Marks Schema
      const existingMarks = await Marks.findOne({ student: user._id });

      if (!existingMarks) {
        // Create a new mark record if none exists
        await Marks.create({
          student: user._id,
          marks: [
            {
              subject: course._id,
              enrollmentDate: currentDate,
              miniProject: 0,
              catMarks: Array.from({ length: 4 }, (_, i) => ({
                label: `CAT ${i + 1}`,
                mark: 0,
              })),
              tmaMarks: Array.from({ length: 4 }, (_, i) => ({
                label: `TMA ${i + 1}`,
                mark: 0,
              })),
              labMarks: Array.from({ length: 4 }, (_, i) => ({
                label: `Lab ${i + 1}`,
                mark: 0,
              })),
              finalMarks: 0,
              eligibilityMarks: 0,
              isEligibleForFinal: false,
              passed: false,
            },
          ],
        });
      } else {
        // Add the subject to existing marks
        existingMarks.marks.push({
          subject: course._id,
          enrollmentDate: currentDate,
          miniProject: 0,
          catMarks: Array.from({ length: 4 }, (_, i) => ({
            label: `CAT ${i + 1}`,
            mark: 0,
          })),
          tmaMarks: Array.from({ length: 4 }, (_, i) => ({
            label: `TMA ${i + 1}`,
            mark: 0,
          })),
          labMarks: Array.from({ length: 4 }, (_, i) => ({
            label: `Lab ${i + 1}`,
            mark: 0,
          })),
          finalMarks: 0,
          eligibilityMarks: 0,
          isEligibleForFinal: false,
          passed: false,
        });
        await existingMarks.save();
      }

      // Add the enrolled course to the user's enrolledCourses array
      user.enrolledCourses.push({
        courseID: course._id, // Required: courseID
        courseCode: course.courseCode,
        courseName: course.courseName,
        enrolledDate: currentDate, // Required: enrolledDate
      });

      enrolledCourses.push(course.courseName);
    }

    // Save the updated user document
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
// DELETE ENROLLED COURSES
export const deleteEnrolledCourses = async (userId, courseCodes) => {
  try {
    // Validate input
    if (!Array.isArray(courseCodes) || courseCodes.length === 0) {
      throw new Error("courseCodes must be a non-empty array of course codes");
    }

    // Find the user based on userId
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Filter out the enrolled courses to be removed
    const removedCourses = user.enrolledCourses.filter((course) =>
      courseCodes.includes(course.courseCode)
    );

    if (removedCourses.length === 0) {
      throw new Error("No matching enrolled courses found for removal");
    }

    // Update the user's enrolledCourses by excluding the removed ones
    user.enrolledCourses = user.enrolledCourses.filter(
      (course) => !courseCodes.includes(course.courseCode)
    );

    // Save the updated user data
    await user.save();

    // Extract the course IDs from the removed courses for Marks deletion
    const removedCourseIds = removedCourses.map((course) => course.courseID);

    // Remove corresponding marks for the removed courses in Marks table
    await Marks.updateOne(
      { student: userId },
      {
        $pull: {
          marks: {
            subject: { $in: removedCourseIds }, // Match subjects by course IDs
          },
        },
      }
    );

    return { message: "Courses and associated marks removed successfully" };
  } catch (error) {
    console.error("Error in deleteEnrolledCourses:", error.message);
    throw new Error(error.message);
  }
};
