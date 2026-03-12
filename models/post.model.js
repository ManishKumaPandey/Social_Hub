import mongoose from "mongoose"; 

const commentSchema = new mongoose.Schema({
     user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
     },
     text:{
        type:string,
        required:true
     }
},
{
    timestamps:true
}
);

const postSchema = new mongoose.Schema({
    author:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },
    content:{
        type:string
    },
    image:{
        type:String
    },
    // audio:{
    //     type:String
    // },
    likes:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ],
    dislike:[
        {
        type:mongoose.Types.ObjectId,
        ref:"User"
        }
    ],
    comments:[commentSchema]
},
{
 timestamps:true
}
)

const Post = mongoose.model("Post",postSchema);
export default Post;