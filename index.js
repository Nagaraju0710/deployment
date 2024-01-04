const express= require("express")
const {connection}= require("./db");
const {userRoutes}= require("./routes/user.routes")
const {postsRoutes}=require("./routes/posts.router")
const { allPostRouter } = require('./routes/allPost.Route')
const { contactRouter } = require('./routes/contactRouter')
const cors=require("cors")
require("dotenv").config()
const app= express();


app.use(express.json());
app.use(cors())

// app.get("/",(req,res)=>{
//     res.status(200).send({"msg":"This is a Home page"})
// })

app.use("/users",userRoutes)
app.use("/posts",postsRoutes)
app.use("/allposts",allPostRouter)
app.use('/contact',contactRouter)

const PORT=process.env.port

app.listen(PORT,async()=>{
    try{
         await connection
         console.log("Server is connected to Db")
         console.log(`Server is running at ${PORT}`)
    }catch(err){
        console.log(err)
    }
})