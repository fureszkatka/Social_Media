const ejwt = require("jsonwebtoken")
const User = require("../models/user")
require('dotenv').config()
var { expressjwt: jwt } = require("express-jwt");


exports.signup = async(req,res) =>{
    const userExists = await User.findOne({email: req.body.email})
    if(userExists){
        res.status(403).json({
            error: "eamil is taken!"
        }
    )}
    
    else{
        const user = await new User(req.body)
        await user.save()

        res.status(200).json({
            message: "signup success"
        })
    }
    
}

exports.signin = (req,res) =>{

    const {email, password} = req.body

    User.findOne({email}, (err,user) =>{
        
        if(err || !user){
            return(res.status(401).json({
                error: "user with this email does not exist!"
            }))
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "email and password does not match!"
            })
        }

        const token = ejwt.sign({_id: user._id},process.env.JWT_SECRET)

        res.cookie("t",token, {expire: new Date() + 9999})

        const {_id,name,email} = user
        return res.json({token, user: {_id,email,name}})

    })
}

exports.signout = (req,res) =>{
    res.clearCookie("t")
    return res.json({message: "signout"})
}

exports.requireSignin = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
})

exports.allUsers = (req,res) =>{
    User.find((err,user) =>{
        if(err) {
            return res.staus(400).json({error: err})
        }
        res.json({user})
    })
} 
