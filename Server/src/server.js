// server.js
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
import StudentDetails from "../src/models/StudentDetails.js"; 

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

// New endpoint for student details
app.post("/api/user/student/details", async (req, res) => {
  try {
    const { id, name, level, completedSubjects, totalYears, currentYear, progressYear, passedSubjects, failedSubjects, status } = req.body;
    const studentDetails = new StudentDetails({
      id,
      name,
      level,
      completedSubjects,
      totalYears,
      currentYear,
      progressYear,
      passedSubjects,
      failedSubjects,
      status,
    });
    await studentDetails.save();
    res.status(201).json({ message: "Student details saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save student details" });
  }
});

app.get("/api/user/student/details", async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentDetails = await StudentDetails.findOne({ id: studentId });
    if (studentDetails) {
      res.status(200).json(studentDetails);
    } else {
      res.status(404).json({ message: "Student details not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student details" });
  }
});


app.put("/api/user/student/details", async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedDetails = req.body;
    await StudentDetails.findOneAndUpdate({ id: studentId }, updatedDetails, {
      new: true,
    });
    res.status(200).json({ message: "Student details updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update student details" });
  }
});

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