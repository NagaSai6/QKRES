const Order = require("../models/order")
var mailjet = require("node-mailjet")
const moment = require("moment");
// const { getMaxListeners } = require("../models/order");
mailjet.connect('64c21cd56e0dd5646ab152fb6c271d67','391b64ddbcc0570d0508c331a2ae0c32')
// 64c21cd56e0dd5646ab152fb6c271d67
// 391b64ddbcc0570d0508c331a2ae0c32
// process.env.MJ_APIKEY_PUBLIC
// process.env.MJ_APIKEY_PRIVATE

function orderController() {
  return {
    store(req, res) {
      const user = req.user
    // validate request
    const name = req.body.name;
    const address = req.body.address;
    const pincode=req.body.pincode;
    const phone = req.body.phone;
    const city =req.body.city;
 
    // const{address,pincode,phone}=req.body
    if(!address || !phone || !pincode|| !name || !city){
      req.flash("error","All  fields are required")
      return res.redirect("/userDetails")
    }
 const order = new Order({
   customerId:user.id,
   items:req.session.cart.items,
   name:req.body.name,
   phone:req.body.phone,
   address:req.body.address,
   pincode:req.body.pincode,
   city:req.body.city,
   landmark:req.body.landmark,
   uEmail:req.body.uEmail
 })
 order.save().then(order=>{

  Order.populate(order,{path:"customerId"},(err,placedOrder)=>{
    delete req.session.cart
    //emit
                   const eventEmitter =req.app.get("eventEmitter")
                  eventEmitter.emit("orderPlaced",placedOrder)

                  const request = mailjet
                  .post("send", {'version': 'v3.1'})
                  .request({
                    "Messages":[
                      {
                        "From": {
                          "Email": "tapti272@gmail.com",
                          "Name": "sameer Ashiq"
                        },
                        "To": [
                          {
                            "Email": uEmail,
                            "Name": "passenger 1"
                          }
                        ],
                        "TemplateID": 2363365,
                        "TemplateLanguage": true,
                        "Subject": "Order Placed",
                        "Variables": {}
                      }
                    ]
                  })
                request
                  .then((result) => {
                    console.log(result.body)
                  })
                  .catch((err) => {
                    console.log(err.statusCode)
                  })
             


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
  // console.log(orders);
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
