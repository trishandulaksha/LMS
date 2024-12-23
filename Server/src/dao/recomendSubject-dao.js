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

// Function to check if a student meets a prerequisite condition
export const getRecommendedSubjects = async (user, completedSubjects) => {
  try {
    const enrolledCourses = user.enrolledCourses || [];
    if (enrolledCourses.length === 0) {
      console.error("No enrolled courses found for the user.");
      return { error: "No enrolled courses found for the user." };
    }

    const enrolledCourseIDs = enrolledCourses.map((course) => course.courseID);

    // Fetch all enrolled subjects in one query
    const enrolledSubjectsDetails = await Subjects.find({
      _id: { $in: enrolledCourseIDs },
    });

    // Extract and deduplicate semesters
    const enrolledSemesters = [
      ...new Set(
        enrolledSubjectsDetails.flatMap((subject) => subject.semesters)
      ),
    ].sort((a, b) => a - b);

    console.log("Enrolled Semesters:", enrolledSemesters);

    // Determine the largest two semesters as current semesters
    const currentSemesters = enrolledSemesters.slice(-2);
    console.log("Current Semesters (Largest Two):", currentSemesters);

    // Calculate the next two semesters
    const nextSemesters =
      currentSemesters.length > 0
        ? [Math.max(...currentSemesters) + 1, Math.max(...currentSemesters) + 2]
        : [1, 2];
    console.log("Next Semesters:", nextSemesters);

    // Fetch subjects for the next semesters in one query
    const nextSemesterSubjects = await Subjects.find({
      semesters: { $in: nextSemesters },
    });

    // Calculate total passed credits from completed subjects
    const passedCredits = completedSubjects.reduce((total, subject) => {
      if (subject.passed) {
        const creditValue = parseInt(subject.subject.charAt(3), 10); // Second digit indicates credits
        return total + creditValue;
      }
      return total;
    }, 0);

    console.log(
      "Total Passed Credits (from completedSubjects):",
      passedCredits
    );

    // Check prerequisites for next semester subjects
    const subjectsWithPrerequisiteChecks = nextSemesterSubjects.map(
      (subject) => {
        const prerequisites = subject.prerequisites || [];
        console.log(`Prerequisites for ${subject.courseCode}:`, prerequisites);

        const prerequisitesStatus = prerequisites.map((prerequisite) => {
          if (prerequisite.includes("Pass in")) {
            const requiredCredits = parseInt(
              prerequisite.match(/Pass in (\d+) credits/)[1],
              10
            );
            const isSatisfied = passedCredits >= requiredCredits;
            return {
              prerequisite,
              status: isSatisfied ? "true" : "false",
            };
          } else if (prerequisite.includes("(CA)")) {
            const prerequisiteCode = prerequisite.split(" ")[0];
            // Check if eligible for final
            const isEligible = completedSubjects.some(
              (subject) =>
                subject.subject === prerequisiteCode &&
                subject.isEligibleForFinal
            );
            return {
              prerequisite,
              status: isEligible ? "true" : "false",
            };
          } else if (prerequisite.includes("(CR)")) {
            const prerequisiteCode = prerequisite.split(" ")[0];
            // Check if enrolled
            const isEnrolled = enrolledCourses.some(
              (course) => course.courseID === prerequisiteCode
            );
            return {
              prerequisite,
              status: isEnrolled ? "true" : "false",
            };
          } else if (prerequisite.includes("(P)")) {
            const prerequisiteCode = prerequisite.split(" ")[0];
            // Check if passed
            const isPassed = completedSubjects.some(
              (subject) =>
                subject.subject === prerequisiteCode && subject.passed
            );
            return {
              prerequisite,
              status: isPassed ? "true" : "false",
            };
          } else {
            // Check if the prerequisite course has been passed
            const prerequisiteCode = prerequisite.split(" ")[0];
            const isPassed = completedSubjects.some(
              (subject) =>
                subject.subject === prerequisiteCode && subject.passed
            );
            return {
              prerequisite,
              status: isPassed ? "true" : "false",
            };
          }
        });

        // Check if all prerequisites are met
        const allPrerequisitesMet = prerequisitesStatus.every(
          (status) => status.status === "true"
        );

        return {
          courseCode: subject.courseCode,
          courseName: subject.courseName,
          prerequisitesStatus,
          allPrerequisitesMet,
        };
      }
    );

    // Filter subjects based on prerequisites being met or empty prerequisites
    const filteredSubjects = subjectsWithPrerequisiteChecks.filter(
      (subject) =>
        subject.allPrerequisitesMet || subject.prerequisitesStatus.length === 0
    );

    return {
      nextSemesters,
      filteredSubjects,
    };
  } catch (error) {
    console.error("Error in getRecommendedSubjects:", error);
    return { error: "An error occurred while processing." };
  }
};
