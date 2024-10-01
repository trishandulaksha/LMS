import axios from "axios";

const API_URL = process.env.API_URL || " http://localhost:8076/api/user/";

export const userLoginAPI = async (
  endpoint,
  userName,
  password,
  setDbResponse
) => {
  try {
    const userData = {
      email: userName,
      password,
    };
    const response = await axios.post(`${API_URL}/${endpoint}`, userData);
    setDbResponse(response);
  } catch (error) {
    setDbResponse({ error: "Network Error" });
  }
};

export const userRegisterApi = async (
  endpoint,
  userName,
  email,
  password,
  gender,
  mobilenumber,
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
    };

    const response = await axios.post(`${API_URL}/${endpoint}`, userData);
  } catch (error) {}
};
