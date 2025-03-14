import {
  deleteEnrolledCourses,
  enrollInCourse,
} from "../dao/course-enrollement-dao.js";

export const courseEnrollementEP = async (req, res) => {
  try {
    const { userId, courseCode } = req.body;

    // console.log("backend function called", userId, courseCode);
    // Validate required fields
    if (!userId || !Array.isArray(courseCode)) {
      return res
        .status(400)
        .json({ error: "Invalid input. userId and courseCode are required." });
    }

    const result = await enrollInCourse(userId, courseCode);

    if (result.error) {
      console.error("Enrollment error:", result.error);
      return res.status(400).json({ error: result.error });
    }

    return res.json(result);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE COURSES FUNCTIONS
export const deleteEnrolledCoursesEP = async (req, res) => {
  try {
    const { userId, courseCode } = req.body;

    // Validate required fields
    if (!userId || !Array.isArray(courseCode)) {
      return res
        .status(400)
        .json({ error: "Invalid input. userId and courseCode are required." });
    }

    const result = await deleteEnrolledCourses(userId, courseCode);

    if (result.error) {
      console.error("course delete error:", result.error);
      return res.status(400).json({ error: result.error });
    }

    return res.json(result);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
