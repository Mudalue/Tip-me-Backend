import express from "express";

import { newVirtualBankAccount } from "../controllers/korapayControllers.js";

const router = express.Router();

router.post('/create_account', newVirtualBankAccount);

export default router;
