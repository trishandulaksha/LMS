import axios from "axios";

const API_URL = " http://localhost:8076/api/user";

// Fetch Lecturer's Subjects with Enrolled Students
export const fetchSubjectsAndStudents = async (lecturerId, setMarksData) => {
  console.log("API LEcturerID", lecturerId);
  try {
    const response = await axios.post(
      `${API_URL}/lecturer/${lecturerId}/enrolled-students`
    );
    console.log("Marks Response", response.data);
    setMarksData(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching subjects and students:", error.message);
    throw error;
  }
};

// Save or Update Marks for Students
export const saveOrUpdateMarks = async (
  lecturerId,
  subjectId,
  studentMarks,
  setMarksData
) => {
  try {
    const payload = {
      lecturerId,
      subjectId,
      studentMarks,
    };
    const response = await axios.post(
      `${API_URL}/lecturer/save-marks`,
      payload
    );
    setMarksData(response.data);
    console.log("Marks Response", response);
    return response.data;
  } catch (error) {
    console.error("Error saving marks:", error.message);
    throw error;
  }
};
