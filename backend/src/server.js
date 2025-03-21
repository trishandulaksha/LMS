import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { databaseSetup } from "./dbConnection/dbConnection.js";
import bodyParser from "body-parser";
import initRouter from "./router/initRouter.js";
import subjectRouter from "./router/courseRouter.js";
import lecturerRouter from "./router/lecturerRouter.js";
import courseEnrollementRouter from "./router/course-enrollementRouter.js";
import studentMarksRouter from "./router/studentMarksRouter.js";
import RecomendedSubjectRouter from "./router/subject-RecomendtaionRouter.js";
import SheduleControllerRouter from "./router/SheduleRouter.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 8076;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", initRouter);
app.use("/api/user/subject", subjectRouter);
app.use("/api/user/lecturer", lecturerRouter);
app.use("/api/user/student", studentMarksRouter);
app.use("/api/user/student", RecomendedSubjectRouter);
app.use("/api/user/subjectenrollement", courseEnrollementRouter);
app.use("/api/user/shedule", SheduleControllerRouter);

databaseSetup()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log("listening on port" + port);
      });
    } catch (error) {
      console.log("Cannot connect to port" + port);
    }
  })
  .catch((err) => {
    console.log("Invalid database connection: " + err);
  });
