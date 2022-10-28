import korapay from "../config/korapay.js";

import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 10 });

const { createVirtualBankAccount, creditVirtualBankAccount } = korapay();

export const newVirtualBankAccount = async (req, res) => {
  const {
    account_name,
    bank_code,
    customer: { name, email },
  } = req.body;

  try {
    await createVirtualBankAccount(
      {
        account_name,
        account_reference: uid(),
        permanent: true,
        bank_code,
        customer: { name, email },
      },
      (response) => {
        // console.log(response.data);
        res.json(response.data);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const payVirtualBankAccount = async (req, res) => {
  const { account_number, amount } = req.body;

  try {
    await creditVirtualBankAccount(
      { account_number, amount, currency: "NGN" },
      (response) => {
        res.json(response.data);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
