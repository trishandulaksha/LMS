import { Router } from "express";
import {
  lecturerSaveAndUpdateMarks,
  lecturerSubjectsWithenrolledStudents,
} from "../user-ep/lecturerSubjects-ep.js";
import { lectureCoursesEP } from "../user-ep/lecturerCourses-ep.js";

const lecturerRouter = Router();
lecturerRouter.post("/courses", lectureCoursesEP);

lecturerRouter.post(
  "/lecturer/:lecturerId/enrolled-students",
  lecturerSubjectsWithenrolledStudents
);
lecturerRouter.post(
  "/lecturer/:lecturerId/save-marks",
  lecturerSaveAndUpdateMarks
);

export default lecturerRouter;
