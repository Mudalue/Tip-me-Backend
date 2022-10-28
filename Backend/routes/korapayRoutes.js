import express from "express";

import {
  newVirtualBankAccount,
  payVirtualBankAccount,
  virtualBankAccountDetails,
} from "../controllers/korapayControllers.js";

const router = express.Router();

router.post("/create_account", newVirtualBankAccount);
router.post("/credit_account", payVirtualBankAccount);
router.get("/:account_reference", virtualBankAccountDetails);

export default router;
