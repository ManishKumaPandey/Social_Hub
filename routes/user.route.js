import express from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = express.Router();

// router.get("/", (req,res)=>{
//     res.send("User home");
// });
router.route("/").get((req,res)=>{
    res.status(201).send("welcome to the home directory or route / user home ")
})

// router.get("/register" , (req,res)=>{
//     res.send("User registered");
// });
router.route("/register").post((req, res) =>{
    res.send("user registered ")
})

export default router;
