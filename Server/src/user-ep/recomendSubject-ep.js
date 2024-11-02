import {
  getEligibleSubjects,
  getInitialRecommendations,
  getMarksForUser,
  getUserWithCourses,
} from "../dao/recomendSubject-dao.js";

export const recomendSubjectsEp = async (req, res) => {
  try {
    try {
      const { userId } = req.params;

      // Retrieve user and their enrolled courses
      const user = await getUserWithCourses(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      // Check if user has no enrolled courses, recommend initial semesters
      if (user.enrolledCourses.length === 0) {
        const recommendedCourses = await getInitialRecommendations();
        return res
          .status(200)
          .json({ message: "First enrollment", recommendedCourses });
      }

      // If the user has enrolled courses, get marks and determine eligibility
      const marks = await getMarksForUser(userId);
      const completedSubjects = marks.map((m) => ({
        subject: m.subject.courseCode,
        passed: m.passed,
        isEligibleForFinal: m.isEligibleForFinal,
      }));

      // Fetch eligible subjects based on prerequisites and marks
      const eligibleSubjects = await getEligibleSubjects(
        user,
        completedSubjects
      );

      res.send({ success: eligibleSubjects });
    } catch (error) {
      res.send({ error: error.message });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
};
