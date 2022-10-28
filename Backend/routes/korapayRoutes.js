import express from "express";

import {
  newVirtualBankAccount,
  payVirtualBankAccount,
} from "../controllers/korapayControllers.js";

const router = express.Router();

router.post("/create_account", newVirtualBankAccount);
router.post("/credit_account", payVirtualBankAccount);

export default router;
