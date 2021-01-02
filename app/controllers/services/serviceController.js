const dotenv = require("dotenv");
dotenv.config();
const Service = require("../../models/service")
const moment = require("moment");
const aws = require("aws-sdk")

aws.config.update({
    region:process.env.AWS_REGION,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_KEY
})



function serviceController(){
    return{
        getSignedRequest(req,res){
          const userId = req.user._id ;
            const s3 = new aws.S3();
            let fileName = req.query['file-name'];
            const fileType = req.query['file-type'];
            var ext = fileName.split('.').pop();
            var random = Math.floor(Math.random() * 90000000000000);
        
            fileName = random + '.' + fileName ;
            let s3Params = {
                Bucket: process.env.AWS_BUCKETNAME,
                Fields:{
                  key: fileName,
                  acl:"private"
                }, 
                Expires: 200,
                Conditions:[
                  {"acl":'private'},
                  ['starts-with', '$Content-Type', 'application/pdf'],
                  ["content-length-range",1,15360000]
                ],
                ContentType :"application/pdf"
              };
              s3.createPresignedPost(s3Params,(err,data)=>{
                if(err){
                    console.log(err);
                    return res.end();
                  }
                  const returnData ={
                    signedRequest: data,
                    url:`https://${process.env.AWS_BUCKETNAME}.s3.amazonaws.com/${fileName}`
                  };
                  // console.log(returnData);
                  res.write(JSON.stringify(returnData));
                  res.end();

              });
            
        },
        serviceFormInputs(req,res){
          const user = req.user;
          const {Itemid,serviceName,customerName,phone,email,department,
            insti,requirement,file,url,country,state,
            city,pincode,landmark,address} = req.body

            // validate input request
            if(!serviceName||!customerName||!phone||!email){
                req.flash("error", "All fields are required")
               return res.redirect(`/mech/${Itemid}`)
              }

              const service = new Service({
                scustomerId : user.id,
                serviceName:serviceName,
                filePath:url,
                requirement:requirement,
                name:customerName,
                email:email,
                city:city,
                department:department,
                insti:insti,
                address:address,
                pincode:pincode,
                phone:phone,
                landmark:landmark,
              })
              service.save().then((service)=>{
                Service.populate(service,{path:"scustomerId"},(err,serviceOrderPlaced)=>{
                  const eventEmitter =req.app.get("eventEmitter")
                  eventEmitter.emit("serviceOrderPlaced",serviceOrderPlaced)
                     return res.redirect('/customer/serviceOrders')
                })
              }).catch(err=>{
                console.log(err);
                req.flash("error","something went wrong")
                return res.redirect(`/mech/${Itemid}`)
              })
            
        
        },
       async index(req,res){
          const services = await Service.find({scustomerId:req.user._id},
            null,
            {sort:{"createdAt": -1}})
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
          res.render("customer/services/service",{service:services,moment:moment})
        },
        async show(req,res){
          const service = await Service.findById(req.params.id)
          if(req.user._id.toString() === service.scustomerId.toString() ){
                  return  res.render("customer/services/singleService",{service})
          }else{
            return res.redirect("/customer/services/service")
          }
        }
        
    }
}
module.exports = serviceController