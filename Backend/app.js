import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import { db } from "./model/index.js";
const app = express();

const ads = [{ title: "Hello world again!!" }];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send(ads);
});
//defining port
const port = process.env.PORT || 3001;

const start = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(db);
    app.listen(port, async () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to connect to database");
    console.log(error.message);
  }
};

start();
