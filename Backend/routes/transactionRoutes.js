import { authentication } from "../middleware/auth.js";
import { account } from "../controllers/transaction.js";
import express from "express";

const router = express.Router();
router.post("/my-account", authentication, account);
export default router;
