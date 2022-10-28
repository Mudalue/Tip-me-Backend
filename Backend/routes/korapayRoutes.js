import express from "express";

import {
  newVirtualBankAccount,
  payVirtualBankAccount,
  virtualBankAccountDetails,
  virtualBankAccountTransactions,
} from "../controllers/korapayControllers.js";

const router = express.Router();

router.get("/account/:account_reference", virtualBankAccountDetails);
router.get("/transactions/:account_number", virtualBankAccountTransactions);

router.post("/create_account", newVirtualBankAccount);
router.post("/credit_account", payVirtualBankAccount);

export default router;
