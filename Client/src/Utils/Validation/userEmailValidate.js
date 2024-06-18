export const emailValidation = (data, setErr, setErrMsg, setCanSubmit) => {
  const tempErrMsg = [];
  if (!data.trim()) {
    setErr(true);
    setCanSubmit(false);
    tempErrMsg.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data)) {
      setErr(true);
      setCanSubmit(false);
      tempErrMsg.push("Please enter a valid email address");
    } else {
      setErr(false);
      setCanSubmit(true);
    }
  }

  return setErrMsg(tempErrMsg);
};
