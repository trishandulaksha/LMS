import { Router } from "express";
import {
  authenticateEp,
  authValidationRules,
  registerValidationRules,
  userRegisterEp,
} from "../user-ep/user-ep.js";
import { recomendSubjectsEp } from "../user-ep/recomendSubject-ep.js";

const initRouter = Router();

initRouter.post("/authenticate", authenticateEp);
initRouter.post("/register", registerValidationRules(), userRegisterEp);

initRouter.post("/recomendSubject", recomendSubjectsEp);

export default initRouter;
