const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Others'], required: true },
    sources: { type: [String], required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    password: { type: String, required: true },
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema);

module.exports={
    UserModel
}