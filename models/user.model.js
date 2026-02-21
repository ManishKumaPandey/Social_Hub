import mongoose from "mongoose";

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
     }
        
      


},
{
    timestamps:true
}

);


const User = mongoose.model("User",userSchema);
export default User;
