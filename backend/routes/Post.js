const express = require("express")
const {getPosts, createPost,postById, postedByUser,isPoster,deletePost,updatePost,getPhoto,singlePost,like,unlike} = require("../controllers/PostsControll")
const {createPostValidator} = require("../validator")
const {requireSignin} = require("../controllers/auth")
const { userById } = require("../controllers/user")


const router = express.Router()

router.get("/posts", getPosts )

router.put("/post/like", requireSignin,like)
router.put("/post/unlike", requireSignin,unlike)

router.post("/post/new/:userId",requireSignin, createPost, createPostValidator)
router.get("/posts/by/:userId", requireSignin, postedByUser)
router.delete("/post/:postId", requireSignin,isPoster,deletePost)
router.put("/post/:postId", requireSignin,isPoster,updatePost)
router.get("/post/:postId", singlePost)
router.get("/post/photo/:postId", getPhoto)


router.param("userId", userById)
router.param("postId", postById)
module.exports = router 