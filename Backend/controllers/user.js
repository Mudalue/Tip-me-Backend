import userSchema from "../model/user.model.js";
import generateotp from "../middleware/generateotp.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../services/mailing.js";

export const useronboarding = async (req, res, next) => {
  let { email, password } = req.body;
  console.log(req.body);
  const isExisting = await userSchema.findOne({ email });
  if (isExisting) {
    return res.json("user already exists!");
  } else {
    try {
      const hashing = await bcrypt.hash(password, 10);
      const otpGenerated = generateotp();
      // const otpHashing = await bcrypt.hash(otpGenerated, 10);
      const user = new userSchema({
        email: email,
        password: hashing,
        otp: otpGenerated,
      });
      await user.save();
      await sendEmail({
        user: email,
        code: otpGenerated,
      });
      return res.status(200).json({
        message: "Check your mail for your otp",
        isSuccess: true,
        email,
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
  console.log(req.body);
  const user = await userSchema.findOne({ email });
  console.log(user.otp);
  if (user) {
    try {
      if (user.otp === otp) {
        await user.updateOne({ email }, { otp: otp });
        res.status(200).json({
          message: "otp verification successfull",
          isSuccess: true,
        });
        user.otp = "";
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "invalid token" });
    }
  } else {
    return res.status(400).json({ message: "email does not exist" });
  }
};

//login
export const login = async (req, res) => {
  let { email, password } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "user does not exist" });
  } else {
    try {
      let jwtToken = jwt.sign(
        {
          email: user.email,
          user: user._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );
      res.status(201).json({
        token: jwtToken,
        expiresIn: 3600,
        isSuccess: true,
        message: "Login successful",
      });
    } catch (error) {
      return res.status(400).json({ message: "invalid credentials" });
    }
  }
};
