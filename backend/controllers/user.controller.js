import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { apiError } from "../Utils/apiError.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";

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

export const updateProfile = asyncHandler(async(req,res)=>{
  const{email,phone,password,bio,avatar} = req.body;
  if(!email && !phone  && !bio ){
    throw new apiError(400, "any one fields is required")
  }
  const user = User.findByIdAndUpdate(req.user?._id,
    {$set:{email,phone,bio}},
    {new:true}
  ).select("-password")
  return res 
      .status(200)
      .json({
        success:true,
        data:req.user,
        message:"user updated successfully"
      })
})

export const updateUserAvatar = asyncHandler(async(req,res)=>{
  const avatarLocalPath =req.file?.path
  
  if(!avatarLocalPath)
    throw new apiError(400, "avatar file is missing")
  const avatar = await uploadOnCloudinary(avatarLocalPath)

  if(!avatar && !avatar.url ){
    throw new apiError(400, "error while uploading")
  }
  const user = await User.findByIdAndUpdate(req.user?._id,
    {$set:{avatar:avatar.url}},
    {new:true}
  ).select("-password")
  return res 
       .status(200)
       .json({
        success:true,
        data:user,
        message:"user avatar updated successfully"
       })
})