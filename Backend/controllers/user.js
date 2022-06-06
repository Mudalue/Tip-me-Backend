import userSchema from "../model/user.model.js";
import generateotp from "../middleware/generateotp.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../services/mailing.js";

export const useronboarding = async (req, res, next) => {
  let { email, password } = req.body;
  const isExisting = await userSchema.findOne({ email });
  if (isExisting) {
    return res.json("user already exists!");
  } else {
    try {
      const hashing = await bcrypt.hash(password, 10);
      const otpGenerated = generateotp();
      const otpHashing = await bcrypt.hash(otpGenerated, 10);
      const user = new userSchema({
        email: email,
        password: hashing,
        otp: otpHashing,
      });
      await user.save();
      await sendEmail({
        user: email,
        code: otpGenerated,
      });
      return res.status(200).json({
        message: "Check your mail for your otp",
        isSuccess: true,
      });
    } catch (error) {
      res.status(400).json({
        error: error,
        isSuccess: false,
      });
    }
  }
};
//verifying otp generated
export const verify = async (req, res, next) => {
  let { email, otp } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "email does not exist" });
  } else {
    try {
      if (user.otp === otp) {
        user.otp = "";
        await user.updateOne({ email }, { otp: otp });
        res.status(200).json({
          message: "otp verification successfull",
          isSuccess: true,
        });
      }
    } catch (error) {
      return res.status(400).json({ message: "invalid token" });
    }
  }
};

//login

