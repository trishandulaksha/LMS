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
    const initialRecommendations = await Subjects.find({
      semesters: { $in: [1, 2] },
    });
    if (!initialRecommendations || initialRecommendations.length === 0) {
      console.error("No initial recommendations found.");
      return [];
    }
    return initialRecommendations;
  } catch (error) {
    console.error("Error fetching initial recommendations:", error);
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

// Function to check if a student meets a prerequisite condition
export const getRecommendedSubjects = async (user, completedSubjects) => {
  try {
    const enrolledCourses = user.enrolledCourses || [];
    const enrolledCourseCodes = enrolledCourses.map(
      (course) => course.courseCode
    );

    // Fetch all subjects across semesters
    const allSubjects = await Subjects.find();

    // Calculate passed credits from completed subjects
    const passedCredits = completedSubjects.reduce((total, subject) => {
      if (subject.passed) {
        const creditValue = parseInt(subject.subject.charAt(3), 10); // Extract credits from courseCode
        return total + creditValue;
      }
      return total;
    }, 0);

    // Process prerequisites for each subject
    const subjectsWithPrerequisiteChecks = allSubjects.map((subject) => {
      const prerequisites = subject.prerequisites || [];

      const prerequisitesStatus = prerequisites.map((prerequisite) => {
        if (prerequisite.includes("Pass in")) {
          const requiredCredits = parseInt(
            prerequisite.match(/Pass in (\d+) credits/)[1],
            10
          );
          return passedCredits >= requiredCredits;
        } else if (prerequisite.includes("(CA)")) {
          const prerequisiteCode = prerequisite.split(" ")[0];
          return completedSubjects.some(
            (subject) =>
              subject.subject === prerequisiteCode && subject.isEligibleForFinal
          );
        } else if (prerequisite.includes("(CR)")) {
          const prerequisiteCode = prerequisite.split(" ")[0];
          return enrolledCourseCodes.includes(prerequisiteCode);
        } else if (prerequisite.includes("(P)")) {
          const prerequisiteCode = prerequisite.split(" ")[0];
          return completedSubjects.some(
            (subject) => subject.subject === prerequisiteCode && subject.passed
          );
        } else {
          const prerequisiteCode = prerequisite.split(" ")[0];
          return completedSubjects.some(
            (subject) => subject.subject === prerequisiteCode && subject.passed
          );
        }
      });

      const allPrerequisitesMet = prerequisitesStatus.every((status) => status);

      return {
        courseCode: subject.courseCode,
        courseName: subject.courseName,
        semester: subject.semesters,
        prerequisites,
        allPrerequisitesMet,
        credits: subject.credits,
        coordinator: subject.courseCoordinator,
        compulsory: subject.compulsory,
      };
    });

    // Filter subjects
    const filteredSubjects = subjectsWithPrerequisiteChecks.filter(
      (subject) =>
        (subject.allPrerequisitesMet || subject.prerequisites.length === 0) &&
        !enrolledCourseCodes.includes(subject.courseCode)
    );

    return { filteredSubjects };
  } catch (error) {
    console.error("Error in getRecommendedSubjects:", error);
    return { error: "An error occurred while processing." };
  }
};
