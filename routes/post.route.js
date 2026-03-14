import express from "express";
import { postUser,deletePostUser,getAllPost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/post").post(verifyJWT,upload.single("image"),postUser);
router.route("/post/:id").delete(verifyJWT,deletePostUser);
router.route("/").get(getAllPost)