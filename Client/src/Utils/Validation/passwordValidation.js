let enteredPassword = "";

export const passwordValidation = (data, setErr, setErrMsg, setCanSubmit) => {
  const tempErrMsg = [];

  if (!data.trim()) {
    setErr(true);
    setCanSubmit(true);
    tempErrMsg.push("Password is required");
  } else {
    const passwordRegEx =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    enteredPassword = data;
    if (!passwordRegEx.test(data)) {
      setErr(true);
      setCanSubmit(true);
      tempErrMsg.push(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long"
      );
    } else {
      setErr(false);
      setCanSubmit(false);
    }
  }
  return setErrMsg(tempErrMsg);
};

export const confirmpasswordValidation = (
  data,
  setErr,
  setErrMsg,
  setCanSubmit
) => {
  const tempErrMsg = [];
  if (!data.trim()) {
    setErr(true);
    setCanSubmit(true);
    tempErrMsg.push("Confirm Password is required");
  } else {
    if (enteredPassword !== data) {
      setErr(true);
      setCanSubmit(true);
      tempErrMsg.push("Password does not match");
    } else {
      setErr(true);
      setCanSubmit(true);
    }
  }
  return setErrMsg(tempErrMsg);
};
