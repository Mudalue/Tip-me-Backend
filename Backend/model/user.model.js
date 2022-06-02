import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const Schema = mongoose.Schema;
const model = mongoose.model;

let userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    otp: {
      type: String,
      required: false,
    },
  },
  {
    collection: "users",
  }
);
userSchema.plugin(uniqueValidator, { message: "Email already in use." });

export default model("User", userSchema);
