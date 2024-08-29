import { userLoginAPI } from "../../API/API";

export const loginDataHandler = (e, setDbResponse, canSubmit) => {
  e.preventDefault();
  const userName = e.target["email"].value;
  const password = e.target["password"].value;

  if (canSubmit && userName && password) {
    userLoginAPI("authenticate", userName, password, setDbResponse);
  } else {
    setDbResponse({ error: "Login Data Not Valid" });
  }
};
