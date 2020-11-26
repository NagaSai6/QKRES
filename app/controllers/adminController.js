

const Order= require("../models/order")


function adminController(){
    return{
        index(req,res){
            Order.find({status:{$ne: "completed"}},null,{sort:{"createdAt":-1}}).
            populate("customerId","-password").exec((err,orders)=>{
              if(err){
                console.log(err);
              }else{
                if(req.xhr){
                  console.log(orders);
                    return res.json(orders)
                }else{
                    return  res.render("admin/orders")
                  }
              }

            })

        }
    }
}

module.exports=adminController
