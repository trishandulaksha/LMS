import { Router } from "express";
import {
  lecturerSaveAndUpdateMarks,
  lecturerSubjectsWithEnrolledStudents,
} from "../user-ep/lecturerCourses-ep.js";
import { lecturerCoursesEP } from "../user-ep/lecturerTeachingCourses-ep.js";

const lecturerRouter = Router();

lecturerRouter.post("/courses", lecturerCoursesEP);

lecturerRouter.post(
  "/:lecturerId/enrolled-students",
  lecturerSubjectsWithEnrolledStudents
);

lecturerRouter.post("/save-marks", lecturerSaveAndUpdateMarks);

export default lecturerRouter;
