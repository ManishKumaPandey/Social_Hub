import express from "express";
import { registerUser , loginUser,getCurrentUser,updateProfile,updateUserAvatar} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();


router.route("/").get((req,res)=>{
    res.status(201).send("welcome to the home directory or route / user home ")
})



router.route("/login").post(loginUser);
router.route("/register").post(registerUser) ;
router.route("/me").get(verifyJWT, getCurrentUser);
router.route("/updateAccountDetails").patch(verifyJWT,upload.single("avatar"),updateProfile);
router.route("/Updateavatar").patch(verifyJWT,upload.single('avatar'),updateUserAvatar);

export default router;
