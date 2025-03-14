import { Router } from "express";

import {
  AddEvent,
  DeleteEvent,
  getAllEvent,
  UpdateEvent,
} from "../user-ep/shedule-ep.js";

const SheduleControllerRouter = Router();

SheduleControllerRouter.post("/events", AddEvent);
SheduleControllerRouter.get("/events/:userID", getAllEvent);
SheduleControllerRouter.put("/events/:id", UpdateEvent);
SheduleControllerRouter.delete("/events/:id", DeleteEvent);

export default SheduleControllerRouter;
// create a event

// router.post("/events",

//     // Get all events for a specific user
// router.get(,

//     // Update an event by ID and userID
// router.put(,

//     // Delete an event by ID and userID
// router.delete(,
