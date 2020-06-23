const express= require('express')
const User = require("../Models/User")
const jwt= require("jsonwebtoken")
const auth= require('../middlewares/auth')


router=express.Router();

router.get("/CreateNewForm",auth, (req,res)=>{
    if(req.auth){
        res.sendFile(__dirname+"/CreateForm.html")
    }else{
        res.sendFile(__dirname+"/login.html")
        console.log("One unauthorised request")
    }
})


router.get("/form/:userId/:indexOfForm",async(req,res)=>{
   const userId= jwt.verify(req.params.userId,"panni")
   const user= await User.findById(userId)

   if(user){
       res.render('form',{data:JSON.stringify({form:user.forms[req.params.indexOfForm]})})
   }else{
       res.status(404).send()
   }
})

router.post("/form",async(req,res)=>{
    const urlArray= req.body.url.split("/")
    const userEncoded= urlArray[urlArray.length-2]
    const formIn= urlArray[urlArray.length-1]

    
        try{
        const userDecoded= jwt.verify(userEncoded,"panni")
        
            const user= await User.findById(userDecoded)
            if(!user){
                res.status(404).send();
                return;
            }
            user.forms[formIn].responses.push(req.body.resp)
            user.save()
            res.send()
        }
        catch(err){
            console.log(err)
            res.status(404).send()
            return;
        }
        
    
        
    
})


router.post("/CreateNewForm",auth, async(req,res)=>{
    try{
        const formData={
            formName:req.body.formName,
            inputs:req.body.inputes,
            responses:[]
        }
        User.updateOne({_id:req.auth.id},
            {$push:{forms:formData}})
        
        .then(async()=>{
            
            const user= await User.findById(req.auth.id)
            console.log(user.forms.length)
            const index=user.forms.length-1
            const userId= jwt.sign(req.auth.id,"panni")
            const url="https://myfrm.herokuapp.com/form/"+userId+"/"+index
            res.send(url)
        })

    }catch(err){
        console.log(err)
    }
})
router.get("/",auth, async(req,res)=>{

    if(req.auth){
        const user=await User.findById(req.auth.id)
        res.render('home',{data:JSON.stringify({forms:user.forms})})
    }else{
        res.sendFile(__dirname+"/login.html")
        console.log("One unauthorised request")
    }
})
router.post("/signup",async(req,res)=>{
    var user=await User.findOne({
        mobile:req.body.mobile
    })
    if(user){
        res.status(409).json("User already exists")
    }else{
        user= new User({
            name:req.body.name,
            mobile:req.body.mobile,
            password:req.body.password
        })
        user.save();
        const payload=user.id
        const token=jwt.sign(payload,"kallapanni")
        
        res.cookie("token", token).send()
    }
})

router.post("/signin",async(req,res)=>{
    const mobile= req.body.mobile
    const password= req.body.password

    const user=await User.findOne({mobile:mobile})
    if(user){
        if(user.password===password){
            const payload=user.id
            const token= jwt.sign(payload,"kallapanni")
            res.cookie("token",token).send()
        }else{
            res.status(409).send()
        }
    }else{
        res.status(404).send()
    }
})

module.exports= router