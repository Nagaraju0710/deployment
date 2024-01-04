const express = require("express");
const jwt =require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {UserModel}=require("../module/user.model")
// const {auth}=require("../middleware/auth.middleware");
// const cors = require('cors')

const userRoutes=express.Router()



userRoutes.post("/register",async(req,res)=>{
    const {email,password,name,gender,phone,sources,city,state}=req.body;
    console.log(email,password,name,gender,phone,sources,city,state)

    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            const user=new UserModel({email,name,gender,password:hash,phone,sources,city,state})
            await user.save();
            res.status(200).send({"msg":"A new User have been added"})
        })
    }catch(err){
        res.status(200).send.apply({"error":err})
    }
})

userRoutes.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user = await UserModel.findOne({email});

    try{
        bcrypt.compare(password,user.password,async(err,result)=>{
            if(result){
                const token=jwt.sign({userId:user._id,name:user.name},"masai")
                res.status(200).send({"msg":"Login Succesfulll" ,"token":token})
            }
            else{
                res.status(200).send({"msg":"wrong credintioal" }) 
            }
        })

    }catch(err){
        res.status(200).send({"msg":err }) 
    }
})


module.exports={
    userRoutes
}