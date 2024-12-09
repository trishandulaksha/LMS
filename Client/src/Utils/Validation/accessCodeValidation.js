export const accesscodeValidation = (
  value,
  setErr,
  setErrMsg,
  setCanSubmit
) => {
  const errors = [];
  if (!value) {
    errors.push("Access code is required.");
  } else if (!/^\d+$/.test(value)) {
    errors.push("Access code must contain only numeric characters.");
  } else if (value.length !== 8) {
    errors.push("Access code must contain 8 numeric characters.");
  }

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
