import Subjects from "../schema/courseSchema.js";
import Marks from "../schema/markSchema.js";
import User from "../schema/userSchema.js";

// Fetch user data along with enrolled courses
export const getUserWithCourses = async (userId) => {
  try {
    const user = await User.findById(userId).populate("enrolledCourses").exec();
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error in getUserWithCourses:", error.message);
    throw new Error("Error fetching user with courses");
  }
};

// Get initial recommended courses (first two semesters)
export const getInitialRecommendations = async () => {
  try {
    return await Subjects.find({ semesters: { $in: [1, 2] } });
  } catch (error) {
    throw new Error("Error fetching initial recommendations");
  }
};

// Fetch the user’s marks for enrolled courses
export const getMarksForUser = async (userId) => {
  try {
    return await Marks.find({ student: userId }).populate("marks.subject");
  } catch (error) {
    throw new Error("Error fetching user marks");
  }
};

// Get eligible subjects based on prerequisites and eligibility criteria
export const getEligibleSubjects = async (user, completedSubjects) => {
  try {
    const eligibleSubjects = await Promise.all(
      user.enrolledCourses.map(async (courseId) => {
        const course = await Subjects.findById(courseId);

        // Check if user meets the passed credits requirement
        if (
          course.passedCreditsRequired &&
          user.passedCredits < course.passedCreditsRequired
        ) {
          return null;
        }

        // Check prerequisites and eligibility criteria
        if (
          course.prerequisites.every((pr) =>
            completedSubjects.some((cs) => cs.subject === pr && cs.passed)
          )
        ) {
          return course;
        }

        return null;
      })
    );

    return eligibleSubjects.filter(Boolean);
  } catch (error) {
    throw new Error("Error fetching eligible subjects");
  }
};
