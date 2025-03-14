import axios from "axios";
import { UseDataContexts } from "../ContextAPI/LoginAndMarksContext";

const API_URL = process.env.API_URL || " http://localhost:8076/api/user/";

export const userLoginAPI = async (
  endpoint,
  userName,
  password,
  setDbResponse,
  setUser
) => {
  try {
    const userData = {
      email: userName,
      password,
    };
    const response = await axios.post(`${API_URL}/${endpoint}`, userData);
    setDbResponse(response);
    setUser(response.data);
  } catch (error) {
    setDbResponse(error);
  }
};

export const userRegisterApi = async (
  endpoint,
  userName,
  email,
  password,
  accesscode,
  mobilenumber,
  gender,
  setDbResponse
) => {
  try {
    const userData = {
      name: userName,
      email: email,
      role: "STUDENT",
      gender: gender,
      mobile_number: mobilenumber,
      password: password,
      accesscode: accesscode,
    };
    console.log(userData);
    const response = await axios.post(`${API_URL}/${endpoint}`, userData);
    console.log(response);
    setDbResponse(response);
  } catch (error) {
    setDbResponse(error);
  }
};

// Save student details
export const saveStudentDetails = async (studentDetails) => {
  try {
    const response = await axios.post(`${API_URL}/student/details`, studentDetails);
    return response.data;
  } catch (error) {
    console.error("Error saving student details:", error);
    throw error;
  }
};

// Fetch student details
export const fetchStudentDetails = async (studentId) => {
  try {
    const response = await axios.get(
      `${API_URL}/student/details/${studentId}` // Ensure this matches the backend route
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching student details:", error);
    throw error;
  }
};

// Update students Detials
export const updateStudentDetails = async (studentId, updatedDetails) => {
  try {
    const response = await axios.put(
      `${API_URL}/student/details/${studentId}`, // Ensure this matches the backend route
      updatedDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error updating student details:", error);
    throw error;
  }
};