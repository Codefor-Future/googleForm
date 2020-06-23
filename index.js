const express= require("express")
const mongoose= require("mongoose")
const bodyParser= require("body-parser")
const cookieParser= require("cookie-parser")
const route= require('./Routes/user')


const app=express();

const MongoInit= require("./config/db")



MongoInit();

app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(bodyParser.json())

app.use("/",route)


const PORT=process.env.PORT|| 3000
app.listen(PORT,()=>{
    console.log("Server Started"+PORT)
})