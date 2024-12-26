import { getLecturerCourses } from "../dao/lecturerTeachingCourses-doa.js";

// Endpoint to fetch lecturer courses
export const lecturerCoursesEP = async (req, res) => {
  try {
    const courses = await getLecturerCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};
