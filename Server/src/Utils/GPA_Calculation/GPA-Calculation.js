import Subjects from "../../schema/courseSchema.js";
import Marks from "../../schema/markSchema.js";
import { gradeTable } from "../GradeTable.js";

export const calculateGPA = async (userId) => {
  try {
    // Fetch marks for the user
    const userMarks = await Marks.find({ student: userId });
    // console.log("GPA Calculation Data:", userMarks);

    if (!userMarks.length) {
      console.log("No subjects found for GPA calculation.");
      return 0;
    }

    let totalWeightedGPV = 0;
    let totalCredits = 0;

    for (const entry of userMarks) {
      for (const mark of entry.marks) {
        // Ensure the necessary fields are present
        if (!mark.subject || mark.finalMarks === undefined) {
          console.warn("Incomplete mark entry skipped:", mark);
          continue;
        }

        // Fetch the subject details from the Course table
        const course = await Subjects.findById(mark.subject);
        if (!course) {
          console.warn("Subject not found in the database:", mark.subject);
          continue;
        }

        // Skip both Level 3 and Level 4 subjects
        if (course.subjectLevel === 3 || course.subjectLevel === 4) {
          console.log(
            `Skipping subject ${mark.subject} (Level ${course.subjectLevel})`
          );
          continue;
        }
        console.log("GPA CALCULATED COURSES", course);

        const subjectCredits = mark.subjectCredits || course.credits;

        if (!subjectCredits) {
          console.warn("No credits found for subject, skipping:", mark.subject);
          continue;
        }

        // Find the GPV for the final marks
        const grade = gradeTable.find(
          (grade) =>
            mark.finalMarks >= grade.min && mark.finalMarks <= grade.max
        );

        if (grade) {
          totalWeightedGPV += grade.gpv * subjectCredits;
          totalCredits += subjectCredits;
        }
      }
    }

    if (totalCredits === 0) {
      console.error("No valid credits found for GPA calculation.");
      return 0;
    }

    const gpa = totalWeightedGPV / totalCredits;
    console.log(`Calculated GPA: ${gpa.toFixed(2)}`);
    return gpa.toFixed(2); // Return GPA rounded to two decimals
  } catch (error) {
    console.error("Error calculating GPA:", error);
    return 0;
  }
};
