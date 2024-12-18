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

const SUBJECT_ENROLLEMENT_URI =
  "http://localhost:8076/api/user/subjectenrollement/saveStudentCourseEnrollements";

export const subjectEnrollment = async (studentID, courseCodes) => {
  try {
    const coursesArray = Array.isArray(courseCodes)
      ? courseCodes
      : [courseCodes];
    const response = await axios.post(`${SUBJECT_ENROLLEMENT_URI}`, {
      userId: studentID,
      courseCode: coursesArray,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching subjects and students:", error.message);
    throw error;
  }
};
