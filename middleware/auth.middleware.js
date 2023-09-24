const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                console.log(decoded)
                req.body.userId=decoded.userId
                req.body.username=decoded.username
                next()
            }else{
               
                res.send({"error":err})
            }
        })
    }else{
        res.send({"msg":"Plese Login"})
    }
}

module.exports={
    auth
}