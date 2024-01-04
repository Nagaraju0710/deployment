const express=require("express")
const {PostsModel}=require("../module/posts.model")
const {auth}=require("../middleware/auth.middleware");
const cors = require('cors')
const postsRoutes=express.Router()

postsRoutes.use(cors());

postsRoutes.use(auth);

 
// post the data 

postsRoutes.post("/add", async (req, res) => {
  
  const payload = req.body
  const token = req.headers.authorization
  console.log(req.body, token)
  try {
      const post = new PostsModel(payload)
      await post.save()
      res.status(200).send({ "msg": "A new post has been added" })
  } catch (err) {
      res.status(400).send({ "Error": err })
  }
})



// get the data

postsRoutes.get('/', async (req, res) => {
  try {
      const posts = await PostsModel.find({ name: req.body.name })
      res.status(200).send(posts)
  } catch (err) {
      res.send({ "Error": err })
  }
})



// patch

postsRoutes.patch("/update/:id", async (req, res) => {
  const payload = req.body
  const id = req.params.id
  console.log(id)
  console.log(req.body)
  try {
      const post = await PostsModel.findOne({ _id: id })
      if (post.name == req.body.name) {
          await PostsModel.findByIdAndUpdate(id, payload)
          res.status(200).send({ "msg": "post updated" })
      } else {
          res.status(400).send({ "msg": "You are not authorize" })
      }
  } catch (err) {
      res.status(400).send({ "msg": "post not found" })
  }
})

// delete

postsRoutes.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  console.log(id)
  try {
      const post = await PostsModel.findOne({ _id: id })
      if (post.name == req.body.name) {
          await PostsModel.findByIdAndDelete(id)
          res.status(200).send({ "msg": "post has been successfully deleted" })
      } else {
          res.status(400).send({ "msg": "You are not authorize" })
      }
  } catch (err) {
      res.status(400).send({ "msg": "post not found" })
  }
})


module.exports={
    postsRoutes
}
