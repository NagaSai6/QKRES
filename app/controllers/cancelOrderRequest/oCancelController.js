const Order = require("../../models/order")


function oCancelController(){
    return{
        index(req,res){
            Order.updateOne({_id:req.body.id},{message:req.body.cancelInput},(err,data)=>{
                if(err){
                    return console.log(err);
                 }
                 const eventEmitter =req.app.get("eventEmitter")
                 eventEmitter.emit("requestforCancellation",{id:req.body.id,message:req.body.cancelInput})
                 res.redirect("/customer/orders")

            })



        }

    }
}

module.exports = oCancelController