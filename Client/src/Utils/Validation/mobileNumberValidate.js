export const mobileNumberValidation = (
  value,
  setErr,
  setErrMsg,
  setCanSubmit
) => {
  const mobileNumberPattern = /^[0-9]{10}$/; // A simple regex for a 10-digit mobile number
  if (!mobileNumberPattern.test(value)) {
    setErr(true);
    setErrMsg(["Please enter a valid 10-digit mobile number."]);
    setCanSubmit(false);
  } else {
    setErr(false);
    setErrMsg([]);
    setCanSubmit(true);
  }
};
