import userSchema from "../model/user.model.js";
import generateotp from "../middleware/generateotp.js";
import bcrypt from "bcryptjs";
import  {sendEmail}  from "../services/mailing.js";

export const useronboarding = async (req, res, next) => {
    let { email, password } = req.body;
    const isExisting = await userSchema.findOne({ email });
    // const findName = await userSchema.findOne({ name });
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
        // await user.save();
        await sendEmail({
          user: email,
          code: otpGenerated,
        });
        console.log("hey");
        return res.status(200).json({
          message: "Check your mail for your otp",
          isSuccess: true,
        });
      } catch (error) {
        // res.status(400).json({
        //   error: error,
        //   isSuccess: false,
        // });
        console.log(error)
      }
    }

};
