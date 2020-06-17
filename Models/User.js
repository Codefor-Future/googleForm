const mongoose= require("mongoose")

const UserSchema= mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    mobile:{
        require:true,
        type:Number
    },
    password:{
        type:String,
        require:true
    }
})

module.exports= mongoose.model("User", UserSchema)