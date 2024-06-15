import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { databaseSetup } from "./dbConnection/dbConnection.js";
import bodyParser from "body-parser";
import initRouter from "./router/initRouter.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 8065;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", initRouter);

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
