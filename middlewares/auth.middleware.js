import jwt from "jsonwebtoken";
import { apiError } from "../Utils/apiError.js";
import { asyncHandler} from "../Utils/asyncHandler.js";
import User from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req,res,next) => {
    
        const token = req.cookies?.accessToken || req.header("authorization")?.
        replace("Bearer ", "");
        if(!token){
            throw new apiError(401,"Unauthorized access");
        }
        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
        const user = await User.findById(decodedToken?._id).select("-password");
        req.user = user;
        next();
    })
