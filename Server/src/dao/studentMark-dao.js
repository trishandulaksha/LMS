import Marks from "../schema/markSchema.js";
import Subjects from "../schema/courseSchema.js";

// Function to process marks data
// Function to process marks data
const processMarksData = async (marksData, studentID) => {
  if (!studentID || studentID.length < 4) {
    throw new Error("Invalid student ID");
  }

  const studentYear = parseInt(studentID.slice(-4), 10); // Extract the year from student ID
  const levels = {};
  let registerSubjectFullCreditAmount = 0; // Total enrolled credits
  let passedCreditAmount = 0; // Total passed credits

  // Iterate through all subjects in the marksData
  for (const subjectData of marksData) {
    // console.log("All Subjects Data", subjectData.marks);

    // Check if there are multiple subjects
    if (subjectData.marks && subjectData.marks.length > 0) {
      // Iterate through all subjects in the marks array
      for (const mark of subjectData.marks) {
        const {
          subject,
          catMarks,
          tmaMarks,
          labMarks,
          finalMarks,
          eligibilityMarks,
          passed,
        } = mark;

        if (!subject || !subject.courseName) {
          console.warn("Subject or courseName is missing");
          continue;
        }

        // Fetch course details from the courses table using subject ID
        const courseDetails = await Subjects.findById(subject._id).exec();

        if (!courseDetails) {
          console.warn(
            `Course details not found for subject ID: ${subject._id}`
          );
          continue;
        }

        const courseCode = courseDetails.courseCode;
        const department = courseCode.slice(0, 3) || "GEN"; // Default to 'GEN' if undefined
        const level = parseInt(courseDetails.subjectLevel, 10) || 1; // Use subjectLevel from the course
        const credits = parseInt(courseDetails.credits, 10) || 3; // Use credits from the course
        const semesters = courseDetails.semesters || [1]; // Get the semesters array (e.g., [1, 2, 3])

        // console.log(courseCode, level, credits, semesters);

        registerSubjectFullCreditAmount += credits;

        // We assume the semester value is part of the `semesters` array in the course details
        // Using the first semester from the `semesters` array (or a default if empty)
        const semester = semesters.length > 0 ? semesters[0] : 1; // Default to 1 if no semester is found

        if (!levels[level]) {
          levels[level] = {
            level,
            totalCredits: 0, // Total credits for this level
            passedCredits: 0, // Passed credits for this level
            passedSubjects: [], // List of passed subjects for this level
            enrolledSubjects: [], // List of all enrolled subjects for this level
          };
        }

        // Track passed subjects and total credits
        if (passed) {
          levels[level].passedCredits += credits;
          levels[level].passedSubjects.push(subject.courseName);
          passedCreditAmount += credits;
        }

        // Track all enrolled subjects
        levels[level].enrolledSubjects.push({
          courseName: subject.courseName,
          courseCode,
          semester: `${semester}`,
          studentYear: `${studentYear}`, // Formatted as "yyyy/semester"
          credits,
          catMarks,
          tmaMarks,
          labMarks,
          finalMarks,
          eligibilityMarks,
          passed,
        });
      }
    } else {
      console.warn("Marks data is missing or empty for subject:", subjectData);
    }
  }

  return { levels, registerSubjectFullCreditAmount, passedCreditAmount };
};

// Function to fetch and process marks by student ID
export const findMarksByStudentId = async (studentID) => {
  console.log(studentID, "findMarksByStudentId function");
  try {
    const marksData = await Marks.find({ student: studentID })
      .populate("marks.subject", "courseName") // Populate subject name
      .exec();

    const { levels, registerSubjectFullCreditAmount, passedCreditAmount } =
      await processMarksData(marksData, studentID);

    // Prepare final response with summed values and structured data
    const response = {
      rawMarksData: marksData,
      processedMarksData: {
        levels,
        registerSubjectFullCreditAmount, // Total enrolled credits
        passedCreditAmount, // Total passed credits
      },
    };

    return response;
  } catch (error) {
    console.error("Error fetching marks by student ID:", error);
    throw error;
  }
};
