export const accessCodeValidation = (
  value,
  setErr,
  setErrMsg,
  setCanSubmit
) => {
  const errors = [];

  // Check if the access code is provided
  if (!value) {
    errors.push("Access code is required.");
  }
  // Check if the format is valid: one uppercase letter followed by 12 digits
  else if (!/^[A-Z]\d{12}$/.test(value)) {
    errors.push(
      "Access code must start with one uppercase letter, followed by 12 numeric characters."
    );
  }
  // Check if the length is 13
  else if (value.length !== 13) {
    errors.push("Access code must be exactly 13 characters long.");
  }

  // Handle validation result
  if (errors.length > 0) {
    setErr(true);
    setErrMsg(errors);
    setCanSubmit(false);
  } else {
    setErr(false);
    setErrMsg([]);
    setCanSubmit(true);
  }
};
