



const express = require('express')
const {PostsModel}=require("../module/posts.model")
const cors = require('cors')
const allPostRouter = express.Router()
allPostRouter.use(cors());


// post post

// postRouter.use(auth)



// Get posts

// Get all posts

allPostRouter.get('/', async (req, res) => {
    try {
        const posts = await PostsModel.find()
        console.log('posts',posts)
        res.status(200).send(posts)
    } catch (err) {
        res.send({ "Error": err })
    }
})


// patch

allPostRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const id = req.params.id
    console.log(id)
    console.log(req.body)
    try {
        const post = await PostsModel.findOne({ _id: id })
            console.log('post',post)
            await PostsModel.findByIdAndUpdate(id, payload)
            res.status(200).send({ "msg": "post updated" })
    } catch (err) {
        res.status(400).send({ "msg": "post not found" })
    }
})

// delete

allPostRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const post = await PostsModel.findOne({ _id: id })
            await PostsModelPostsModel.findByIdAndDelete(id)
            res.status(200).send({ "msg": "post has been successfully deleted" })
    } catch (err) {
        res.status(400).send({ "msg": "post not found" })
    }
})



module.exports = { allPostRouter }