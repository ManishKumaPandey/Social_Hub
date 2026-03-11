import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { apiError } from "../Utils/apiError.js";

export const registerUser = asyncHandler(async(req, res) =>{
    
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

         if(!password){
      throw new apiError(400,"password is required")
         }
         const hashedPssword = await bcrypt.hash(password, 10);
         const user = await User.create({
         userName,
         email,
         phone, 
         password: hashedPssword
       })
       const createdUser = await User.findById(user._id).select("-password")

       res.status(201).json({message:"User registerd successfully", createdUser});

      })
    

export const loginUser = asyncHandler(async(req,res) =>{
  const{email,phone,password} = req.body;
  if(!email && !phone){
    throw new apiError (400 , "email or phone is required");
  }
  const user =await User.findOne({
    $or:[{email},{phone}]
  })
  
  if(!user){
    throw new apiError (404, "user does not exists")
  }
  
  const isPasswordCorrect =await bcrypt.compare(password,user.password)
  if(!isPasswordCorrect){
    throw new apiError(401 , "password incorrect")
  }
  
  const loggedInUser = await User.findById(user._id).select("-password");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  const option = {
    httpOnly: true,
    Secure: true
  }
   return res
      .status(200)
      .cookie("accessToken",accessToken,option)
      .cookie("refreshToken",refreshToken,option)
      .json({
    success: true,
    data:loggedInUser, accessToken,refreshToken,
    message:"successfully login"
   })   
})
export const getCurrentUser = asyncHandler(async(req,res)=>{
  return res
    .status(200)
    .json({
      success: true,
      data:req.user,
      message:"current user fetched successfully"
    });
})