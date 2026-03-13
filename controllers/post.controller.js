import { asyncHandler } from "../Utils/asyncHandler.js";
import { apiError } from "../Utils/apiError.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import Post from "../models/post.model";

export const postUser = asyncHandler(async(req,res)=>{
    const {content}= req.body
    const image = req.file?.path
    const user = req.user._id
    if(!content && !image){
        return res
          .status(400)
          .json({
              message: " content or image is  required"
        }) 
    }
    
    const uploadImage = image ? await uploadOnCloudinary(image) : null

    const createPost = await Post.create({
        author:user,
        content,
        image:uploadImage?.url || ""
    })
  return res 
       .status(201)
       .json({
        success: true,
        data:creatPost,
        message:"post uploaded successfully"
       })
    
})

