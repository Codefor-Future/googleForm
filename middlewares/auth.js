const jwt=require('jsonwebtoken')
const User= require('../Models/User')


auth= async(req,res,next)=>{
    if(req.cookies.token){
        const decoded=jwt.verify(req.cookies.token,"kallapanni")
        const user=await User.findById(decoded)
        if(user){
            req.auth={
                id:user.id
            }
            next()
        }else{
            req.auth=false
            next()
        }
    }else{
        req.auth=false
        next()
    }
    
}

module.exports=auth