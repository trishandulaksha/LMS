export const emailValidation = (data, setErr, setErrMsg, setCanSubmit) => {
  const tempErrMsg = [];
  if (!data.trim()) {
    setErr(true);
    setCanSubmit(true);
    tempErrMsg.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data)) {
      setErr(true);
      setCanSubmit(true);
      tempErrMsg.push("Please enter a valid email address");
    } else {
      setErr(true);
      setCanSubmit(true);
    }
  }

  return setErrMsg(tempErrMsg);
};
