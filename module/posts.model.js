const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    phone: { type: String, required: true },
    email: { type: String, required: true },
    name: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},{
    versionKey:false
})

const PostsModel=mongoose.model("posts",postSchema);

module.exports={
    PostsModel
}