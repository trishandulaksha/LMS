import { authenticateUser, userRegistration } from "../dao/user-dao.js";
import { Validation } from "../validation/validation.js";
import { validationResult } from "express-validator";

export function authValidationRules() {
  return [Validation.email, Validation.password];
}

export function registerValidationRules() {
  return [
    Validation.name(),
    Validation.email(),
    Validation.gender(),
    Validation.mobileNumber(),
    Validation.password(),
  ];
}

// User Login End Pont
export async function authenticateEp(req, res) {
  //   console.log("Function called", req.body);
  const loginDataVerify = validationResult(req);

  if (!loginDataVerify.isEmpty()) {
    return res.send({ error: loginDataVerify.array()[0]["msg"] });
  }

  try {
    const userData = await authenticateUser(req.body);

    res.send(userData);
  } catch (error) {
    res.send({ error: error.message });
  }
}

// User register endpoint
export async function userRegisterEp(req, res) {
  const userDataVerify = validationResult(req);

  if (!userDataVerify.isEmpty()) {
    return res.send({ error: userDataVerify.array()[0]["msg"] });
  }

  try {
    const userData = await userRegistration(req.body);

    res.send(userData);
  } catch (error) {
    res.send({ error: error.message });
  }
}
