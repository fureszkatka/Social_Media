const express = require("express")
const morgan = require("morgan")
const app = express()
const bodyParser = require("body-parser")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const expressValidator = require("express-validator")
const routers = require("./routes/Post")
dotenv.config()
const fs = require("fs")
const cors = require("cors")


const authRoutes = require("./routes/auth.js")
const userRoutes = require("./routes/user.js")
const cookieParser = require("cookie-parser")

app.get("/", (req, res) =>{
    fs.readFile('./docs/apiDocs.json', (err,data) =>{
        if(err){
            res.status(400).json({
            error: err
            })
        }
        const docs = JSON.parse(data)
        res.json(docs)
    })
})


app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())
app.use("/", routers)
app.use("/",authRoutes)
app.use("/",userRoutes)
app.use(morgan("dev"))
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).send({error: "unauthorize"});
    } else {
        next(err);
    }
});

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true})
.then(() =>{console.log("db committed")})

mongoose.connection.on("error", err =>{
    console.log("db connection error: ${err.message")
})




app.listen(process.env.PORT)

