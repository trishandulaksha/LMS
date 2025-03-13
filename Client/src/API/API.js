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
    sessionStorage.setItem("dbResponse", response);
    console.log(response);
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
