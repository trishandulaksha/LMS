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

// Recomended subject

export const getRecommendedSubjects = async (user, completedSubjects) => {
  const recommendedSubjects = [];
  const nextSemestersSubjects = [];

  // Ensure enrolledCourses is defined and is an array, else fallback to an empty array
  const enrolledCourses = Array.isArray(user.enrolledCourses)
    ? user.enrolledCourses
    : [];
  completedSubjects = Array.isArray(completedSubjects) ? completedSubjects : [];

  // Guard clause to ensure user has enrolled courses and completed subjects
  if (!enrolledCourses.length) {
    console.error("User has no enrolled courses.");
    return { error: "No enrolled courses found for user." };
  }

  // Determine the current semester based on completed subjects
  let currentSemester = 1;

  // Check the highest semester completed by the student
  const enrolledSemesters = enrolledCourses.map((course) => course.semesters);

  enrolledSemesters.forEach((semesterArr) => {
    // Ensure semesterArr is defined and an array
    if (Array.isArray(semesterArr)) {
      semesterArr.forEach((semester) => {
        if (semester > currentSemester) currentSemester = semester;
      });
    }
  });

  console.log("Current Semester:", currentSemester);

  // Based on the current semester, fetch subjects for the next two semesters
  if (currentSemester <= 2) {
    nextSemestersSubjects.push(
      ...(await Subjects.find({ semesters: { $in: [1, 2] } }))
    );
  } else if (currentSemester <= 4) {
    nextSemestersSubjects.push(
      ...(await Subjects.find({
        semesters: { $in: [3, 4] },
        prerequisites: { $size: 0 },
      }))
    );
  } else if (currentSemester <= 6) {
    nextSemestersSubjects.push(
      ...(await Subjects.find({
        semesters: { $in: [5, 6] },
        prerequisites: { $size: 0 },
      }))
    );
  } else if (currentSemester <= 8) {
    nextSemestersSubjects.push(
      ...(await Subjects.find({
        semesters: { $in: [7, 8] },
        prerequisites: { $size: 0 },
      }))
    );
  }

  // Ensure nextSemestersSubjects is an array before iterating
  if (Array.isArray(nextSemestersSubjects)) {
    nextSemestersSubjects.forEach((subject) => {
      // Check if the student is already enrolled in this subject
      const isAlreadyEnrolled = enrolledCourses.some(
        (course) => course.courseCode === subject.courseCode
      );

      if (!isAlreadyEnrolled) {
        // Check if prerequisites are met (for remaining subjects)
        const meetsPrerequisites = subject.prerequisites.every((prereq) => {
          return completedSubjects.some(
            (completed) => completed.subject === prereq && completed.passed
          );
        });

        if (meetsPrerequisites) {
          // Check if the student meets the credits requirement
          const passedCredits = completedSubjects.filter(
            (completed) => completed.passed
          ).length;
          if (
            subject.passedCreditsRequired &&
            passedCredits >= subject.passedCreditsRequired
          ) {
            recommendedSubjects.push(subject);
          } else if (!subject.passedCreditsRequired) {
            recommendedSubjects.push(subject);
          }
        }
      }
    });
  } else {
    console.error("nextSemestersSubjects is not an array.");
  }

  // Return the list of recommended subjects
  console.log("Recommended subjects:", recommendedSubjects);
  return recommendedSubjects;
};
