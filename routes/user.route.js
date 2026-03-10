import express from "express";
import { registerUser , loginUser} from "../controllers/user.controller.js";

const router = express.Router();


router.route("/").get((req,res)=>{
    res.status(201).send("welcome to the home directory or route / user home ")
})



router.route("/login").post(loginUser);
router.route("/register").post(registerUser) ;
   

export default router;
