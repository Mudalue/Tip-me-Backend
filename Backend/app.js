import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import { db } from "./config/index.js";
import api from './routes/auth.routes'
const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use('api', api);

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
