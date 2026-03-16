import { asyncHandler } from "../Utils/asyncHandler.js";
import { apiError } from "../Utils/apiError.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import Post from "../models/post.model.js";
import { registerUser } from "./user.controller.js";

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
        data:createPost,
        message:"post uploaded successfully"
       })
    
})
export const deletePostUser = asyncHandler(async(req,res)=>{
   const post_id = req.params.id
  const post = await Post.findById(post_id)
  if(!post){
    throw new apiError(404, "post not found")
  }
  if(post.author.toString() != req.user._id.toString()){
    throw new apiError(403, "you are not authorized to delete this post ")
  }
   await Post.findByIdAndDelete(post_id)
   return res 
      .status(200)
      .json({
        success:true,
        message:"Post deleted successfully"
      })
}
)
export const getAllPost = asyncHandler(async(req,res)=>{
    
    const post = await Post.find().populate("author", "userName avatar")
    if(!post){
        throw new apiError(404,"post not found")
    }
    return res 
       .status(200)
       .json({
        success:true,
        data:post,
        message:"Post fetched successfully"
       })
})
export const likeUnlikePost = asyncHandler(async(req,res)=>{
  const post_id = req.params.id
  const user_id = req.user._id
  const post = await Post.findById(post_id)
  if(!post){
    throw new apiError (404,"not found")
  }
  if(post.likes.includes(user_id)){
    await Post.findByIdAndUpdate(post_id,{$pull:{likes:user_id}})
    return res
        .status(200)
        .json({
          success:true,
          message:"Post unliked"
        })
  }
  else{
    await Post.findByIdAndUpdate(post_id,{$push:{likes:user_id}})
    return res 
       .status(200)
       .json({
        success:true,
        message:"Post liked"
       })
  }
})
export const addComment = asyncHandler(async(req,res)=>{
    const post_id = req.params.id
    const user_id = req.user._id
    const text = req.body.text
    if(!text){
      throw new apiError(400,"text is required")
    }
    const post = await Post.findById(post_id)
    if(!post){
      throw new apiError(404,"not found ")
    }
    await Post.findByIdAndUpdate(post_id,{$push:{comments:{user:user_id,text:text}}})
    return res 
      .status(200)
      .json({
        success:true,
        message:"comments are added"
      })
})
export const deleteComment = asyncHandler(async(req,res)=>{
  const post_id = req.params.id
  const comment_id = req.params.comment_id
  const post = await Post.findById(post_id)
  if(!post){
    throw new apiError (404,"not found")
  }
  const comment = post.comments.find(c=>c._id.toString()=== comment_id)
  if(comment.user.toString() != req.user._id.toString()){
    throw new apiError(403,"you are not authorized to delete this post ")
  }
  else{
    await Post.findByIdAndUpdate(post_id,{$pull:{comments:{_id:comment_id}}})
  }
  return res 
     .status(200)
     .json({
      success: true,
      message:"comment is deleted "
     })

})

