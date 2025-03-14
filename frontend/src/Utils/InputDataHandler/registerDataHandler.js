import { userRegisterApi } from "../../API/API";

export const registerDataHandler = (e, setDbResponse, canSubmit) => {
  e.preventDefault();
  const userName = e.target["username"].value;
  const email = e.target["email"].value;
  const password = e.target["password"].value;
  const confirmpassword = e.target["confirmpassword"].value;
  const accesscode = e.target["accesscode"].value;
  const mobilenumber = e.target["mobilenumber"].value;
  const gender = e.target["gender"].value;

  if (canSubmit && userName && password) {
    if (password === confirmpassword) {
      userRegisterApi(
        "register",
        userName,
        email,
        password,
        accesscode,
        mobilenumber,
        gender,
        setDbResponse
      );
    } else {
      setDbResponse({ error: "Password does not match" });
    }
  } else {
    setDbResponse({ error: "Network Error" });
  }
};
