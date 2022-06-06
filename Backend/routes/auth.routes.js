import express from "express";
import { useronboarding, verify } from "../controllers/user.js";
import "dotenv/config";
const router = express.Router();

const url = process.env.URL;
//sign up
router.post(`${url}/signup`, useronboarding);
//otp verification
router.post(`${url}/verify`, verify);
export default router;
