const express=require("express")
const {NoteModel}=require("../model/note.model")
const {auth}=require("../middleware/auth.middleware")
const noteRoutes=express.Router()

noteRoutes.use(auth)

noteRoutes.post("/create",async(req,res)=>{
    const payload=req.body
    console.log(payload)
    try{
        const note=new NoteModel(payload);
        await note.save();
        res.status(200).send({"msg":"new note has been added"})
    }catch(err){
        res.status(400).send({"error":err})
    }  
})

noteRoutes.get("/get",async(req,res)=>{
    const note= await NoteModel.find({userId:req.body.userId});
    res.status(200).send(note)
})

noteRoutes.get("/get/:id",async(req,res)=>{
    const note= await NoteModel.find({userId:req.body.userId,_id:req.params.id});
    res.status(200).send(note)
})

noteRoutes.patch("/update/:id",auth,async(req,res)=>{
    const {id}=req.params;
    const note=await NoteModel.findOne({_id:id})
    console.log(note)
    try{
            await NoteModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({note})

        
    }catch(err){
        res.status(400).send({"error":err})
    }
})

noteRoutes.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params
   const note=await NoteModel.findOne({_id:id})
   console.log(note)
    try{
        if(req.body.userId!==note.userId){
            res.status(400).send({"error":"you are not authorized"})
        }else{
            await NoteModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"post deleted"})
        }
    }catch(err){
        res.status(400).send({"error":err})
    }
})
module.exports={
    noteRoutes
}