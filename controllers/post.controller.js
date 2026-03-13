import { asyncHandler } from "../Utils/asyncHandler.js";
import { apiError } from "../Utils/apiError.js";


export const postUser = asyncHandler(async(req,res)=>{
    const {content}= req.body
    const image = req.file
    const user = req.user
    if(!content && !image){
        return res
          .status(400)
          .json({
              message: " content or image is requiredis required"
        }) 
    }
    
})

