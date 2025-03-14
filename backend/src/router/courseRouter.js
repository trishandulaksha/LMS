import { Router } from "express";

import { validateCourse } from "../validation/validateCourse.js";
import {
  bulkCreateSubjectsEp,
  createSubjectEp,
  deleteSubjectEp,
  getAllSubjectsEp,
  getSubjectByIdEp,
  updateSubjectEp,
} from "../user-ep/course-ep.js";

const subjectRouter = Router();

subjectRouter.get("/getSubjectByID/:courseCode", getSubjectByIdEp);
subjectRouter.post("/getallSubjects", getAllSubjectsEp);
subjectRouter.post("/addSubjects", validateCourse, createSubjectEp);
subjectRouter.post("/updateSubject", validateCourse, updateSubjectEp);
subjectRouter.post("/deleteSubject", deleteSubjectEp);
subjectRouter.post("/bulk-subjects", bulkCreateSubjectsEp);

export default subjectRouter;
