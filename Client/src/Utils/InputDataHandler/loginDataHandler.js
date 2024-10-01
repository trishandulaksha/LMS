import { userLoginAPI, userRegisterApi } from "../../API/API";

export const loginDataHandler = (e, setDbResponse, canSubmit) => {
  e.preventDefault();
  const userName = e.target["email"].value;
  const password = e.target["password"].value;

  if (canSubmit && userName && password) {
    userLoginAPI("authenticate", userName, password, setDbResponse);
  } else {
    setDbResponse({ error: "Network Error" });
  }
};

export const registerDataHandler = (e, setDbResponse, canSubmit) => {
  e.preventDefault();
  const userName = e.target["username"].value;
  const email = e.target["email"].value;
  const password = e.target["password"].value;
  const confirmpassword = e.target["confirmpassword"].value;

  if (canSubmit && userName && password) {
    if (password == confirmpassword) {
      userRegisterApi("register", userName, email, password, setDbResponse);
    } else {
      setDbResponse({ error: "Password does not match" });
    }
  } else {
    setDbResponse({ error: "Network Error" });
  }
};
