const mongoose = require('mongoose')
require('dotenv').config()


const connectToMongo = () =>{
    mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Connected")).catch((e)=>console.log(e.message))
}

module.exports = connectToMongo