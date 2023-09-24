const express=require("express")
const {connection}=require("./db")
const  {userRoutes}=require("./routes/user.routes")
const {noteRoutes}=require("./routes/note.routes")
const cors=require("cors") // to connect with front end
require("dotenv").config()
const app=express();

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.status(200).send({"msg":"This is the home page"})
})

app.use("/users",userRoutes)
app.use("/notes",noteRoutes)
const PORT=process.env.Port
app.listen (PORT,async()=>{
try{
await connection
console.log("server is connected to DB")
console.log(`Server is running at ${PORT}`)
}
catch(err){
    console.log(err)
}
})