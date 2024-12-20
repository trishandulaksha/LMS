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
