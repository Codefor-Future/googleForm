
const mongoose= require('mongoose')
MongoURL= process.env.MongoURL

MongoInit=()=>{
    mongoose.connect(MongoURL,{ useNewUrlParser: true,useUnifiedTopology: true  })
    console.log("DB connected")
}

module.exports= MongoInit