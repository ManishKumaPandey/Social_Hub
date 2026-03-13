import express from "express";
import { postUser } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.route("/post").post(verifyJWT,upload.single("uploadImage"),postUser);