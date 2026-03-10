import express from "express";
import { registerUser , loginUser,getCurrentUser} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.route("/").get((req,res)=>{
    res.status(201).send("welcome to the home directory or route / user home ")
})



router.route("/login").post(loginUser);
router.route("/register").post(registerUser) ;
router.route("/me").get(verifyJWT, getCurrentUser);

export default router;
