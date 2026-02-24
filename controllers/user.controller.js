import User from "../models/user.model.js";
import bcrypt from "bcrypt";


export const registerUser = async(req, res) =>{
    try{
       const {userName,email,phone,password} = req.body;
       if(!email && !phone){
        return res.status(400).json({
            message:" either email or phone is required"
        });
       }


       const existingUser = await User.findOne({$or: [{email} , {phone}]});
       if(existingUser) {
        return res.status(409).json({message: "User already exist"});
       }

         // if i use if - else for password availability then user which is outside shown error..
         const hashedPssword = await bcrypt.hash(password, 10);
         const user = await User.create({
         userName,
         email,
         phone, 
         password: hashedPssword
       })
    

       res.status(201).json({message:"User registerd successfully", user});


    }
    catch(error){
      res.status(500).json({message: error.message});
    }

};