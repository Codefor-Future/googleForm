const express= require("express")
const mongoose= require("mongoose")
const bodyParser= require("body-parser")
const cookieParser= require("cookie-parser")
const user= require('./Routes/user')

const app=express();

const MongoInit= require("./config/db")
const User= require("./Models/User")

MongoInit();

app.use("/",user)





app.listen(3000,()=>{
    console.log("Server Started")
})