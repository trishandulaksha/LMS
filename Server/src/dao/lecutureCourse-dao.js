import mongoose from "mongoose";
import Marks from "../schema/markSchema.js";
import Lecturer from "../schema/lecturerSchema.js";
import User from "../schema/userSchema.js";
import Subjects from "../schema/courseSchema.js";

// //////////////////////////////
// Retrieve Lecturer's Subjects and Enrolled Students with Marks
// //////////////////////////////
export const getLecturerSubjectsAndStudents = async (lecturerId) => {
  console.log("Frontend to backend Function called", lecturerId);
  try {
    const lecturer = await Lecturer.findById(lecturerId).select(
      "teachingSubjects"
    );
    if (!lecturer) throw new Error("Lecturer not found");

    // Get subject IDs taught by the lecturer
    const teachingSubjectIds = lecturer.teachingSubjects.map(
      (subjectId) => new mongoose.Types.ObjectId(subjectId)
    );

    // Fetch marks records for the lecturer's subjects
    const marksRecords = await Marks.find({
      "marks.subject": { $in: teachingSubjectIds },
    })
      .populate("student", "name email") // Populate student details
      .populate("marks.subject", "courseCode courseName eligibilityCriteria") // Populate subject details
      .exec();

    // Organize data by subject
    const data = teachingSubjectIds.map((subjectId) => {
      // Extract marks for the current subject
      const subjectMarks = marksRecords
        .map((record) => ({
          student: record.student,
          marks: record.marks.find(
            (m) => m.subject._id.toString() === subjectId.toString()
          ),
        }))
        .filter((entry) => entry.marks); // Exclude entries without marks for the subject

      return {
        subject: subjectMarks[0]?.marks.subject || null,
        students: subjectMarks.map((entry) => ({
          student: entry.student,
          marks: {
            miniProject: entry.marks.miniProject,
            catMarks: entry.marks.catMarks,
            tmaMarks: entry.marks.tmaMarks,
            labMarks: entry.marks.labMarks,
            finalMarks: entry.marks.finalMarks,
            eligibilityMarks: entry.marks.eligibilityMarks,
            isEligibleForFinal: entry.marks.isEligibleForFinal,
            passed: entry.marks.passed,
          },
        })),
      };
    });

    return data;
  } catch (error) {
    console.error("Error in getLecturerSubjectsAndStudents:", error.message);
    throw new Error(`Error retrieving data: ${error.message}`);
  }
};

// //////////////////////////////
// Bulk Save or Update Marks for Students
// ////////////////////////////////
export const saveOrUpdateMarks = async (data) => {
  try {
    const { lecturerId, subjectId, studentMarks } = data;

    // Step 1: Validate and fetch subject and lecturer
    const subject = await Subjects.findById(subjectId);
    if (!subject) {
      throw new Error("Subject not found");
    }

    const lecturer = await Lecturer.findById(lecturerId);
    if (!lecturer) {
      throw new Error("Lecturer not found");
    }

    // Step 2: Loop through each student and update their marks
    for (const studentMark of studentMarks) {
      const { studentId, marks } = studentMark;

      // Step 3: Fetch student details from User schema
      const student = await User.findById(studentId);
      if (!student) {
        throw new Error(`Student with ID ${studentId} not found`);
      }

      // Step 4: Find the marks record for the student
      const marksRecord = await Marks.findOne({
        student: studentId,
      });

      if (!marksRecord) {
        throw new Error(`Marks record not found for Student: ${studentId}`);
      }

      // Step 5: Find the correct subject in the marks array and update it
      const subjectIndex = marksRecord.marks.findIndex(
        (mark) => mark.subject.toString() === subjectId
      );

      if (subjectIndex !== -1) {
        // Update the specific subject's marks
        marksRecord.marks[subjectIndex] = {
          ...marksRecord.marks[subjectIndex],
          subject: subjectId,
          miniProject: marks.miniProject,
          catMarks: marks.catMarks.map((catMark) => ({
            label: catMark.label,
            mark: catMark.mark,
          })),
          tmaMarks: marks.tmaMarks.map((tmaMark) => ({
            label: tmaMark.label,
            mark: tmaMark.mark,
          })),
          labMarks: marks.labMarks.map((labMark) => ({
            label: labMark.label,
            mark: labMark.mark,
          })),
          finalMarks: marks.finalMarks,
        };

        // Step 6: Recalculate eligibility marks after updating marks
        const eligibilityMarks = await calculateEligibilityMarks(
          marksRecord.marks[subjectIndex],
          subject
        );
        marksRecord.marks[subjectIndex].eligibilityMarks = eligibilityMarks;

        // Step 7: Update eligibility status
        marksRecord.marks[subjectIndex].isEligibleForFinal =
          eligibilityMarks >= 40; // Threshold for eligibility

        // Step 8: Update passed status
        marksRecord.marks[subjectIndex].passed =
          marksRecord.marks[subjectIndex].isEligibleForFinal &&
          marksRecord.marks[subjectIndex].finalMarks >= 40;

        // Step 9: Update overall status
        if (marksRecord.marks[subjectIndex].passed) {
          marksRecord.status = "Eligible"; // Fully passed
        } else if (marksRecord.marks[subjectIndex].isEligibleForFinal) {
          marksRecord.status = "Resit"; // Eligible for final but not passed
        } else {
          marksRecord.status = "Pending"; // Not eligible
        }

        // Save the updated record
        await marksRecord.save();
      } else {
        // If no matching subject found, throw an error
        throw new Error(`Subject not found for Student: ${studentId}`);
      }
    }

    return {
      message: "Marks updated and eligibility recalculated successfully",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Helper Function to Calculate Eligibility Marks
const calculateEligibilityMarks = async (marksData, subject) => {
  const { catMarks, tmaMarks, labMarks, miniProject } = marksData;
  const criteria = subject.eligibilityCriteria;

  let catTotal = 0,
    tmaTotal = 0,
    labTotal = 0;

  // Check if the necessary data is present
  if (!catMarks || !tmaMarks || !labMarks || miniProject === undefined) {
    throw new Error("Missing necessary marks data");
  }

  // CAT Calculation
  if (criteria.cat === "best") {
    catTotal = Math.max(...catMarks.map((cat) => cat.mark));
  } else if (criteria.cat === "average") {
    catTotal =
      catMarks.reduce((acc, cat) => acc + cat.mark, 0) / catMarks.length;
  }

  // TMA Calculation
  if (criteria.tma === "average") {
    tmaTotal =
      tmaMarks.reduce((acc, tma) => acc + tma.mark, 0) / tmaMarks.length;
  } else if (criteria.tma === "best") {
    tmaTotal = Math.max(...tmaMarks.map((tma) => tma.mark));
  }

  // Lab Calculation
  if (labMarks.length > 0) {
    labTotal =
      labMarks.reduce((acc, lab) => acc + lab.mark, 0) / labMarks.length;
  }

  let eligibilityMarks;

  // Eligibility calculation based on criteria
  switch (criteria.type) {
    case "cat60_tma40":
      eligibilityMarks = catTotal * 0.6 + tmaTotal * 0.4;
      break;
    case "best_cat_avg_tma":
      eligibilityMarks = (catTotal + tmaTotal) / 2;
      break;
    case "miniProject60_rest40":
      const otherMarks = (catTotal + tmaTotal + labTotal) / 3;
      eligibilityMarks = miniProject * 0.6 + otherMarks * 0.4;
      break;
    default:
      eligibilityMarks = (catTotal + tmaTotal + labTotal + miniProject) / 4;
  }

  // Cap eligibility marks at 100
  eligibilityMarks = Math.min(eligibilityMarks, 100);

  return eligibilityMarks;
};
