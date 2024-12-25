import axios from "axios";

const API_URL = "http://localhost:8076/api/user/student/";

export const getMarksAndGradeByStudentId = async (studentID) => {
  try {
    const response = await axios.post(
      ` ${API_URL}/${studentID}/getStudentMarks`
    );
    console.log("backedn response data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching marks:", error);
    throw error;
  }
};
