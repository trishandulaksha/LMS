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
