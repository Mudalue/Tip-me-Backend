import cloudinary from '../utils/cloudinary.js'
import userSchema from "../model/user.model.js";

export const uploadimage = async (res, req, next) => {
    try {
        let {name, profile_img, cloudinary_id} = req.body;
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Create new user
        let user = new User({
          name,
          profile_img: result.secure_url,
          cloudinary_id: result.public_id,
        });
        // save user details in mongodb
        await user.save();
        res.status(200)
          .send({
            user
          });
      } catch (err) {
        console.log(err);
      }
}