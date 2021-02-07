
const Service = require("../models/service")
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
                  // console.log(orders);
                
                    return res.json(orders)
                }else{
                    return  res.render("admin/orders")
                  }
              }

            })

        },
        serviceIndex(req,res){
          Service.find({status:{$ne:"completed"}},null,{sort:{"createdAt":-1}}).
          populate("scustomerId","-password").exec((err,services)=>{
            if(err){
              console.log(err);
            }else{
              if(req.xhr){
                return res.json(services)
              }else{
                return res.render("admin/services")
              }
            }
          })
        }
    }
}

module.exports=adminController
