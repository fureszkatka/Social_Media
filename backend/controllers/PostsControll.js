const Post = require("../models/Post")
const formidable = require("formidable")
const fs = require("fs")
const _ = require("lodash")

exports.postById = (req,res,next,id) =>{
    Post.findById(id)
    .populate("postedBy", "_id name")
    .select("_id title body created photo likes")
    .exec((err,post) =>{
        if(err || !post){
            return res.status(400).json({
                error: err
            })
        }
        req.post = post
        next()
    })
} 

exports.singlePost = (req,res) =>{
    return res.json(req.post)
}

exports.getPosts = (req, res) =>{
    const posts = Post.find()
    .populate("postedBy", "_id name")
    .select("_id title body created photo likes")
    .sort({created: -1})
    .then(posts => {
        res.json({posts})
    })
    .catch(err => console.log(err))
}

exports.createPost = (req,res) => {
    let form = new formidable.IncomingForm()

    form.keepExtensions = true 

    form.parse(req,(err,fields,files) =>{

        if(err){
            return res.status(400).json({
                error: "photo could not be uploaded"
            })
        }
        post = new Post(fields)
        post.postedBy = req.profile

        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.filepath)
            post.photo.contentType = files.photo.mimetype
            console.log('post: ', post)
        }

        
        post.save((err,result) =>{
            if(err){
                return res.status(400).json({
                    error: err
                })
            }

            post.hashed_password = undefined
            post.salt = undefined
            res.json(result)
        })

    })
}

exports.postedByUser = (req,res) =>{
    Post.find({ postedBy: req.profile._id})
        .populate("postedBy", "_id name")
        .select("_id title body photo created likes")
        .sort("_created")
        .exec((err,posts) =>{
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(posts)
        })
}

exports.isPoster = (req,res,next) =>{
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id

    if(!isPoster){
        return res.status(403).json({
            error: "user is not authorized"
        })
    }
    next()
}


exports.updatePost = (req,res, next) =>{
    let form = new formidable.IncomingForm()

    form.keepExtensions = true 

    form.parse(req,(err,fields,files) =>{

        if(err){
            return res.status(400).json({
                error: "photo could not be uploaded"
            })
        }

        let post = req.post
        post = _.extend(post, fields)
        post.updated = Date.now()

        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.filepath)
            post.photo.contentType = files.photo.type
        }

        post.save((err,result) =>{
            if(err){
                return res.status(400).json({
                    error: err
                })
            }

            post.hashed_password = undefined
            post.salt = undefined
            res.json(result)
        })

    })
}


exports.deletePost = (req,res) =>{
    let post = req.post
    post.remove((err,post) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: "post deleted succesfully"
        })
    })
}

exports.getPhoto = (req,res, next) =>{

    res.set(("Content-Type", req.post.photo.contentType))
    return res.send(req.post.photo.data)

}


exports.like = (req,res) =>{
    Post.findByIdAndUpdate(
        req.body.postId, 
        {$push: {likes: req.bodí.userId}},
        { new: true }
    ).exec((err,result) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        else{
            res.json(result)
        }
    })
}



exports.unlike = (req,res) =>{
    Post.findByIdAndUpdate(
        req.body.postId, 
        {$pull: {likes: req.body.userId}},
        { new: true }
    ).exec((err,result) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        else{
            res.json(result)
        }
    })
}