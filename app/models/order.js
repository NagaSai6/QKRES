const mongoose = require("mongoose")
const User = require("./users")

const orderSchema = new mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items :{type:Object,required:true},
    phone :{type:String,required:true},
    pincode:{type:String,required:true},
    name:{type:String,required:true},
    address:{type:String,required:true},
    paymentMethod:{type:String,default:"Cash on Delivery"},
    status:{type:String,default:"order_placed"}
},{timestamps:true})


const Order = mongoose.model("Order",orderSchema,"orders")

module.exports = Order
