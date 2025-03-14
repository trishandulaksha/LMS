export const userNameValidation = (data, setErr, setErrMsg, setCanSubmit) => {
  const tempErrMsg = [];

  if (!data.trim()) {
    setErr(true);
    setCanSubmit(false);
    tempErrMsg.push("User Name is required");
  } else {
    const userNameRegEx = /^[a-zA-Z1-9__]{3,100}$/;
    if (!userNameRegEx.test(data)) {
      setErr(true);
      setCanSubmit(false);
      tempErrMsg.push(
        "User name can contain only letters and underscores and should be between 3 and 100 characters"
      );
    } else {
      setErr(false);
      setCanSubmit(true);
    }
  }
  return setErrMsg(tempErrMsg);
};
