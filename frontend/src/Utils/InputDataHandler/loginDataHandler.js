import { userLoginAPI, userRegisterApi } from "../../API/API";

export const loginDataHandler = (e, setDbResponse, canSubmit, setUser) => {
  e.preventDefault();
  const userName = e.target["email"].value;
  const password = e.target["password"].value;

  if (canSubmit && userName && password) {
    userLoginAPI("authenticate", userName, password, setDbResponse, setUser);
  } else {
    setDbResponse({ error: "Network Error" });
  }
};
