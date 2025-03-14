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
  // Check if the format is valid: one letter (case-insensitive) followed by 12 digits
  else if (!/^[A-Za-z]\d{12}$/.test(value)) {
    errors.push(
      "Access code must start with a letter (uppercase or lowercase), followed by 12 numeric characters."
    );
  }
  // Check if the length is exactly 13
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
