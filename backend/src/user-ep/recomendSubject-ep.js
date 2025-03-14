import express from "express";
import {
  getInitialRecommendations,
  getMarksForUser,
  getRecommendedSubjects,
  getUserWithCourses,
} from "../dao/recomendSubject-dao.js";

// Endpoint to fetch recommended subjects for a user by ID
export const recomendedSubjectEp = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch user with courses
    const user = await getUserWithCourses(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has enrolled courses
    if (!user.enrolledCourses || user.enrolledCourses.length === 0) {
      // Fetch initial recommendations
      const initialRecommendations = await getInitialRecommendations();

      return res.status(200).json({
        message:
          initialRecommendations.length > 0
            ? "No courses enrolled yet. Here are some recommended courses."
            : "No courses enrolled yet, and no recommendations available.",
        recommendedSubjects: { filteredSubjects: initialRecommendations },
      });
    }

    // Fetch marks for the user
    const marksData = await getMarksForUser(userId);
    if (!Array.isArray(marksData)) {
      console.error("Invalid marksData structure.", marksData);
      return res.status(500).json({ error: "Error processing marks data." });
    }

    // Process completed subjects
    const completedSubjects = marksData
      .flatMap((student) => {
        if (student.marks && Array.isArray(student.marks)) {
          return student.marks.map((mark) => {
            if (mark.subject && mark.subject.courseCode) {
              return mark.passed
                ? {
                    subject: mark.subject.courseCode,
                    passed: mark.passed,
                    isEligibleForFinal: mark.isEligibleForFinal,
                  }
                : null;
            }
            return null;
          });
        }
        return [];
      })
      .filter(Boolean);

    // Fetch recommended subjects
    const recommendedSubjects = await getRecommendedSubjects(
      user,
      completedSubjects
    );

    return res.status(200).json({
      message: "Here are your recommended subjects based on eligibility.",
      recommendedSubjects,
    });
  } catch (error) {
    console.error("Error fetching recommended subjects:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing." });
  }
};
