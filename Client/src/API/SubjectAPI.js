import axios from "axios";

const API_URL = "http://localhost:8076/api/user/subject/getSubjectByID";

export const fetchSubjectsByCourseCode = async (courseCode) => {
  try {
    const response = await axios.get(`${API_URL}/${courseCode}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching subjects and students:", error.message);
    throw error;
  }
};
