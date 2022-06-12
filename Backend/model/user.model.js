import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const Schema = mongoose.Schema;
const model = mongoose.model;

let userSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
    },
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
    profile_img: {
      type: String,
      required: false,
    },
    cloudinary_id: {
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
