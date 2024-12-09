import { Router } from "express";
import {
  courseEnrollementEP,
  deleteEnrolledCoursesEP,
} from "../user-ep/course-enrollement-ep.js";

const courseEnrollementRouter = Router();

courseEnrollementRouter.post(
  "/saveStudentCourseEnrollements",
  courseEnrollementEP
);
courseEnrollementRouter.post(
  "/deleteStudentCourseEnrollements",
  deleteEnrolledCoursesEP
);
// courseEnrollementRouter.post("/addSubjects", validateCourse, createSubjectEp);
// courseEnrollementRouter.post("/updateSubject", validateCourse, updateSubjectEp);
// courseEnrollementRouter.post("/deleteSubject", deleteSubjectEp);
// courseEnrollementRouter.post("/bulk-subjects", bulkCreateSubjectsEp);

export default courseEnrollementRouter;
