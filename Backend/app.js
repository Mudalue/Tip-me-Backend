import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import { db } from "./config/index.js";
// import hbs from "hbs";
import router from "./routes/auth.routes.js";
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
// app.engine('.hbs', hbs);
// app.set('view engine', '.hbs');
app.use("/", router);

//defining port
const port = process.env.PORT || 3001;
const start = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(db);
    console.log("db connected");
    app.listen(port, async () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to connect to database");
    console.log(error.message);
  }
};

start();
