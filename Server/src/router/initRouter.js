import { Router } from "express";
import {
  authenticateEp,
  registerValidationRules,
  userRegisterEp,
} from "../user-ep/user-ep.js";

const initRouter = Router();

initRouter.post("/authenticate", authenticateEp);
initRouter.post("/register", registerValidationRules(), userRegisterEp);

export default initRouter;
