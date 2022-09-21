import mono from "../config/mono.js";
const { createAccount } = mono();

export const account = async (req, res) => {
  const { first_name, last_name, email, phone, bvn } = req.body;
  try {
    await createAccount({ first_name, last_name, email, phone, bvn });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
