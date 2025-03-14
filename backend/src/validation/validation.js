import { check } from "express-validator";

export const Validation = {
  name: () =>
    check("name")
      .not()
      .isEmpty()
      .withMessage("Name is required!")
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 100 })
      .withMessage("Name should not be more than 100 characters long!"),

  gender: () =>
    check("gender")
      .not()
      .isEmpty()
      .withMessage("Gender is required!")
      .isString()
      .withMessage("Gender must be a string")
      .isIn(["Male", "Female"])
      .withMessage("Gender must be either 'Male' or 'Female'"),

  mobileNumber: () =>
    check("mobile_number")
      .not()
      .isEmpty()
      .withMessage("Mobile Number is required!")
      .isString()
      .withMessage("Mobile Number must be a string")
      .isLength({ max: 10 })
      .withMessage("Mobile Number should be  10  characters long"),

  email: () =>
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please enter a valid email address"),

  password: () =>
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isString()
      .withMessage("Password must be a string")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
};
