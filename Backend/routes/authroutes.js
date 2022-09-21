import express from "express";
import { useronboarding, verify, login } from "../controllers/user.js";
import "dotenv/config";
const router = express.Router();


//sign up
router.post('/signup', useronboarding);
//otp verification
router.post('/verify', verify);
//login
router.post('/login', login);

export default router;
