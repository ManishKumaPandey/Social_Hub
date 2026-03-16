import express from "express";
import { postUser,deletePostUser,getAllPost ,likeUnlikePost, addComment,deleteComment} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verify } from "crypto";
const router = express.Router();

router.route("/post").post(verifyJWT,upload.single("image"),postUser);
router.route("/post/:id").delete(verifyJWT,deletePostUser);
router.route("/").get(getAllPost);
router.route("/post/:id/likeAndUnlike").post(verifyJWT,likeUnlikePost);
router.route("/post/:id/comment").post(verifyJWT,addComment);
router.route("/post/:id/comment/:comment_id").delete(verifyJWT,deleteComment);

export default router;