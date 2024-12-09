import { check, validationResult } from "express-validator";

export const validateCourse = [
  check("courseName")
    .optional()
    .isString()
    .withMessage("Course name must be a string."),
  check("prerequisites")
    .optional()
    .isArray()
    .withMessage("Prerequisites must be an array."),
  check("semesters")
    .optional()
    .isArray()
    .withMessage("Semesters must be an array."),
  check("courseCoordinator")
    .optional()
    .isString()
    .withMessage("Course coordinator must be a string."),
  check("credits")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Credits must be a positive integer."),
  check("subjectLevel")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Subject level must be a positive integer."),
  check("passedCreditsRequired")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Passed credits required must be a non-negative integer."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
