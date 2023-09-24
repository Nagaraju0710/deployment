const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {UserModel}=require("../model/users.model")
const userRoutes=express.Router()

userRoutes.post("/register",async(req,res)=>{
    const {email,pass,username}=req.body;
    console.log(email,pass,username)
try{
bcrypt.hash(pass, 5, async(err, hash)=> {
   const user=new UserModel({email,username,pass:hash})
   await user.save()
   res.status(200).send({"msg":"A new user has been registered"})
});

}catch(err){
    res.status(400).send({"error":err})
}
})

userRoutes.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    const user=await UserModel.findOne({email});
    try{
        bcrypt.compare(pass, user.pass, async(err, result)=> {
            // result == true
            if(result){
                const token=jwt.sign({userId:user._id,username:user.username},"masai");
                res.status(200).send({"msg":"Login Successfull!","token":token})
            }else{
                res.status(200).send({"msg":"Wrong credential"})
            }
        });

    }catch(err){
        res.status(400).send({"error":err})
    }
})

module.exports={
    userRoutes
}
