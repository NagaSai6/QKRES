const mongoose = require("mongoose")
const User = require("./users")

const serviceSchema = new mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    filePath:{
        type:String
    },
    name:{type:String},
    email:{type:String}
    

})