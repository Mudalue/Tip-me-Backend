import express from "express";
const router = express.Router();
import {uploadimage} from "../controllers/image.js";
import upload from "../utils/multer.js";
//image-uploaf
router.post("image-upload", upload.single("image"), uploadimage);

export default router;
