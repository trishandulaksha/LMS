import { Router } from "express";
import { recomendedSubjectEp } from "../user-ep/recomendSubject-ep.js";

const RecomendedSubjectRouter = Router();

RecomendedSubjectRouter.post(
  "/recommended-subjects/:userId",
  recomendedSubjectEp
);

export default RecomendedSubjectRouter;
