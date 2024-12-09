import { getCoursesWithStudentDetails } from "../dao/lecutureCourse-dao.js";

export const lectureCoursesEP = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Lecturer email is required" });
    }

    const result = await getCoursesWithStudentDetails(email);

    if (result.error) {
      return res.status(404).json({ error: result.error });
    }

    return res.status(200).json(result.success);
  } catch (error) {
    console.error("API Error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data" });
  }
};
