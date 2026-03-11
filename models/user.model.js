import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
      userName:{
        type:String,
        required:true,
        uniqued:true,
        lowercase: true,
        trim:true,
        index:true
      },
      email:{
         type:String,
         sparse:true,
         unique:true,
         lowercase:true,
         trim:true

      },
      password:{
        type:String,
        required: true,
        minlength: 6
      },
      
     phone:{
        type:String,
        sparse:true,
        unique:true
     },
     bio:{
      type:String
     },
     avatar:{
      type:String
     }
        
      


},
{
    timestamps:true
}

);
userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id: this._id,
      email:this.email,
      phone:this.phone
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}


const User = mongoose.model("User",userSchema);
export default User;
