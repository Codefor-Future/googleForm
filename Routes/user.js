const express= require('express')
router=express.Router();

router.get("/", (req,res)=>{
    console.log("one request")
    res.sendFile(__dirname+"/login.html")

})


module.exports= router