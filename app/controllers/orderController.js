const Order = require("../models/order")
const sgMail = require('@sendgrid/mail');
const moment = require("moment");
// const { getMaxListeners } = require("../models/order");
sgMail.setApiKey(process.env.S_EMAILAPI);


function orderController() {
  return {
    store(req, res) {
      const user = req.user
    // validate request
    const address = req.body.address;
    const pincode=req.body.pincode;
    const phone = req.body.phone;
    // const{address,pincode,phone}=req.body
    if(!address || !phone || !pincode ){
      req.flash("error","All  fields are required")
      return res.redirect("/cart")
    }
 const order = new Order({
   customerId:user._id,
   items:req.session.cart.items,
   phone:req.body.phone,
   address:req.body.address,
   pincode:req.body.pincode
 })
 order.save().then(order=>{

  Order.populate(order,{path:"customerId"},(err,placedOrder)=>{
    delete req.session.cart 
    //emit
                   const eventEmitter =req.app.get("eventEmitter")
                            eventEmitter.emit("orderPlaced",placedOrder)
   
    return res.redirect("/customer/orders")

  })





   
 

 }).catch(err=>{
   console.log(err);
   req.flash("error","something went wrong")
   return res.redirect("/cart")
 })
},
async index(req,res){
  const orders = await Order.find({customerId:req.user._id},
    null,
    {sort:{"createdAt": -1}})
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
  res.render("customer/orders",{order:orders,moment:moment})
  console.log(orders);
},
async show(req,res){
 const order = await Order.findById(req.params.id)
 if(req.user._id.toString() === order.customerId.toString() ){
         return  res.render("customer/singleOrder",{order})
 }else{
   return res.redirect("/")
 }



}
  }
}


module.exports = orderController
