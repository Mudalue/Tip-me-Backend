import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API = axios.create({
  baseURL: "https://api.korapay.com/merchant/api/v1",
});

API.interceptors.request.use(
  (config) => {
    config.headers[
      "Authorization"
    ] = `Bearer ${process.env.KORAPAY_TEST_SECRET_KEY}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const korapay = () => {
  const createVirtualBankAccount = async (
    {
      account_name,
      account_reference,
      permanent,
      bank_code,
      customer: { name, email },
    },
    callback
  ) => {
    try {
      const response = await API.post("/virtual-bank-account", {
        account_name,
        account_reference,
        permanent,
        bank_code,
        customer: { name, email },
      });

      return callback(response);
    } catch (error) {
      console.log(error);
    }
  };

  const creditVirtualBankAccount = async (
    { account_number, amount, currency },
    callback
  ) => {
    try {
      const response = await API.post("/virtual-bank-account/sandbox/credit", {
        account_number,
        amount,
        currency,
      });

      return callback(response);
    } catch (error) {
      console.log(error);
    }
  };

  return { createVirtualBankAccount, creditVirtualBankAccount };
};

export default korapay;
