import express from "express";
import { useronboarding, verify, login } from "../controllers/user.js";
import "dotenv/config";
import { authentication } from "../middleware/auth.js";
const router = express.Router();


//sign up
router.post('/signup', useronboarding);
//otp verification
router.post('/verify', verify);
//login
router.post('/login', login);

export default router;
