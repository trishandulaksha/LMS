import { Router } from "express";
import { getMarksByStudentId } from "../user-ep/studentMarks-ep.js";

const studentMarksRouter = Router();

studentMarksRouter.post("/:studentID/getStudentMarks", getMarksByStudentId);

export default studentMarksRouter;
