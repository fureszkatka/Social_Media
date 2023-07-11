const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema


let postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "title required",
    },
    body: { 
        type: String,
        required: "body required",
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
})

module.exports = mongoose.model("Post", postSchema)
    