const Order = require("../models/order")

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.S_EMAILAPI);

function statusController(){
return{
    update(req,res){
        Order.updateOne({_id:req.body.orderId},{status:req.body.status},(err,data)=>{
                if(err){
                   return console.log(err);
                }
                else{
                    Order.findById(req.body.orderId,function(err,order){
                        const mail = order.uEmail;
                        const name = order.name;
                        const status = order.status;
                        const mailOptions = {
                            to:mail,
                            from: process.env.FROM_EMAIL,
                            subject: req.body.status,
                            text: `Hi ${name} \n
                            Your order status has been updated,Thanks for shopping with QkRes \n\n
                            Order Status : ${status}\n`,
                          };
                          sgMail.send(mailOptions, (error, result) => {
                            if (error) {
                              return res.status(500).json({
                                message: error.message
                              });
                            }
                          });
                    })

                    const eventEmitter =req.app.get("eventEmitter")
                    eventEmitter.emit("orderUpdated",{id:req.body.orderId,status:req.body.status})
               return res.redirect("/admin/orders")
                }
               
  
        })

    }
}
}


module.exports = statusController