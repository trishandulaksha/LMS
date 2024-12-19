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

  console.log("Enrolled Courses:", enrolledCourses);
  console.log("Completed Subjects:", completedSubjects);

  // Guard clause to ensure user has enrolled courses and completed subjects
  if (!enrolledCourses.length) {
    console.error("User has no enrolled courses.");
    return { error: "No enrolled courses found for user." };
  }

  // Initialize current semester to 1 for first-time or newly enrolled students
  let currentSemester = 1;

  // Check if the student has successfully completed the first two semesters
  const firstTwoSemestersEnrolled = enrolledCourses.some((course) => {
    return (
      Array.isArray(course.semesters) &&
      (course.semesters.includes(1) || course.semesters.includes(2))
    );
  });

  if (firstTwoSemestersEnrolled) {
    currentSemester = 3; // After completing 1st and 2nd semesters, recommend 3rd and 4th semesters
  }

  console.log("Current Semester:", currentSemester);

  // Fetch subjects for the next two semesters based on the current semester
  const semestersToFetch =
    currentSemester <= 2
      ? [3, 4] // If the current semester is 1 or 2, fetch next semester's subjects (3, 4)
      : currentSemester <= 4
      ? [5, 6] // If the current semester is 3 or 4, fetch next semester's subjects (5, 6)
      : currentSemester <= 6
      ? [7, 8] // If the current semester is 5 or 6, fetch next semester's subjects (7, 8)
      : [];

  console.log("Fetching subjects for semesters:", semestersToFetch);

  try {
    // Fetch subjects for the next semesters, ensuring prerequisites and passedCreditsRequired are respected
    nextSemestersSubjects.push(
      ...(await Subjects.find({
        semesters: { $in: semestersToFetch },
      }))
    );
  } catch (error) {
    console.error("Error fetching subjects for next semesters:", error);
    return [];
  }

  console.log("Next Semester Subjects:", nextSemestersSubjects);

  // Function to check prerequisites
  const checkPrerequisites = (subject) => {
    if (!subject.prerequisites || subject.prerequisites.length === 0) {
      return true; // No prerequisites for the subject
    }

    // Filter out "Pass in 15 credits" from prerequisites
    const validPrerequisites = subject.prerequisites.filter(
      (prereq) => !prereq.includes("Pass in")
    );

    return validPrerequisites.every((prereq) => {
      const [courseCode, condition] = prereq.split(" ");
      switch (condition) {
        case "(CR)": // Course required to be enrolled in
          return enrolledCourses.some(
            (course) => course.courseCode === courseCode
          );
        case "(CA)": // Completed course eligible
        case "(P)": // Passed course
          return completedSubjects.some(
            (completed) => completed.subject === courseCode && completed.passed
          );
        default:
          return false;
      }
    });
  };

  // Filter nextSemestersSubjects for recommendations
  for (const subject of nextSemestersSubjects) {
    console.log("Evaluating next semester subject:", subject.courseCode);

    // Check if the subject is already completed or enrolled
    const isAlreadyCompletedOrEnrolled =
      completedSubjects.some(
        (completed) => completed.subject === subject.courseCode
      ) ||
      enrolledCourses.some(
        (course) => course.courseCode === subject.courseCode
      );

    if (isAlreadyCompletedOrEnrolled) {
      console.log(
        `Subject ${subject.courseCode} is already completed or enrolled. Skipping.`
      );
      continue; // Skip this subject
    }

    // Add next semester subjects regardless of whether prerequisites are met
    console.log(`Subject ${subject.courseCode} added from next semester.`);
    recommendedSubjects.push(subject);
  }

  // Filter remaining recommended subjects based on prerequisites and passed credits
  for (const subject of nextSemestersSubjects) {
    console.log("Evaluating subject:", subject.courseCode);

    // Check if the subject is already completed or enrolled
    const isAlreadyCompletedOrEnrolled =
      completedSubjects.some(
        (completed) => completed.subject === subject.courseCode
      ) ||
      enrolledCourses.some(
        (course) => course.courseCode === subject.courseCode
      );

    if (isAlreadyCompletedOrEnrolled) {
      console.log(
        `Subject ${subject.courseCode} is already completed or enrolled. Skipping.`
      );
      continue; // Skip this subject
    }

    // Check if prerequisites are met
    if (!checkPrerequisites(subject)) {
      console.log(
        `Subject ${subject.courseCode} prerequisites not met. Skipping.`
      );
      continue; // Skip this subject
    }

    // Check passed credits requirement
    const passedCredits = completedSubjects.filter(
      (completed) => completed.passed
    ).length;

    if (
      subject.passedCreditsRequired &&
      passedCredits < subject.passedCreditsRequired
    ) {
      console.log(
        `Subject ${subject.courseCode} requires ${subject.passedCreditsRequired} credits. User has ${passedCredits}. Skipping.`
      );
      continue; // Skip this subject
    }

    console.log(
      `Subject ${subject.courseCode} is eligible. Adding to recommendations.`
    );
    recommendedSubjects.push(subject);
  }

  console.log("Recommended subjects:", recommendedSubjects);
  return recommendedSubjects;
};
