import { Router } from "express";
import {
  lecturerSaveAndUpdateMarks,
  lecturerSubjectsWithenrolledStudents,
} from "../user-ep/lecturerSubjects-ep.js";

const lecturerRouter = Router();

lecturerRouter.post(
  "/lecturer/:lecturerId/enrolled-students",
  lecturerSubjectsWithenrolledStudents
);
lecturerRouter.post(
  "/lecturer/:lecturerId/save-marks",
  lecturerSaveAndUpdateMarks
);

export default lecturerRouter;
