const Order = require("../../models/order")
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.S_EMAILAPI);

function oCancelController(){
    return{
        index(req,res){
            Order.updateOne({_id:req.body.id},{message:req.body.cancelInput},(err,data)=>{
                console.log(data);
                if(err){
                    return console.log(err);
                 }else{

                     let name = data.name
                     const mailOptions = {
  to:"damonashiq@gmail.com",
  from: process.env.FROM_EMAIL,
  subject: `Requesting Cancellation`,
  text: `Hi ${name} \n
  customer Name : ${data.name} wants to cancel the order \n\n
  orderId : ${data._id} \n
  phone:${data.phone} \n
  current Status : ${data.status}\n`,
};
sgMail.send(mailOptions, (error, result) => {
  if (error) {
    return res.status(500).json({
      message: error.message
    });
 
  }
  const eventEmitter =req.app.get("eventEmitter")
  eventEmitter.emit("requestforCancellation",{id:req.body.id,message:req.body.cancelInput})
  res.redirect("/customer/orders")
});

                 }
              
                 

            })



        }

    }
}

module.exports = oCancelController