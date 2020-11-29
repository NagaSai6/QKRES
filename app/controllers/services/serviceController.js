const Service = require("../../models/service")
const moment = require("moment");
// const uploads = require("./awsFilecontoller")
// const singleUpload = uploads.single("file")



function serviceController(){
    return{
        serviceStore(req,res){
            const{customerName,email,department,insti,requirement} = req.body
            const frequency = req.body.frequency
            const pincode = req.body.pincode;
            const landmark = req.body.Landmark;
            const phone = req.body.phone;
            const address = req.body.address
            const suggestion = req.body.suggestion;
            const other = req.body.other;
            const file=req.body.file
            const id = req.body.id;
            let redirectPath = "/mech/"+id
            // console.log(redirectPath);
            let user = req.user
            let path= 'uploads/'+ req.file.originalname  ;
            let serviceName = req.body.serviceName;

           if(!customerName||!email||!department||!insti||!requirement||!pincode||!landmark||!phone||!address){
            req.flash("error", "All fields are required")
            req.flash("customerName", customerName)
            req.flash("email", email)
            req.flash("department",department)
            req.flash("insti",insti)
            req.flash("pincode", pincode)
            req.flash("address", address)
            req.flash("other", other)
            req.flash("suggestion", suggestion)
            return res.redirect(redirectPath)
           }
           
           let service = new Service({
               customerId:user._id,
               name : customerName,
               email:email,
               department:department,
               insti:insti,
               filePath:path,
               requirement:requirement,
               serviceName:serviceName,
               pincode:pincode,
               address:address,
               phone:phone,
               landmark:landmark,
               suggestion:suggestion,
               frequency:frequency,
               other:other,
           })

           service.save().then(function(service){
            res.redirect("/customer/services")  
           }).catch(err=>{
               console.log(err);
               req.flash("error", "Something went wrong")      
                res.redirect(redirectPath) 
           })
        },
        async serviceIndex(req,res){
            let services = await Service.find({customerId:req.user._id},
              null,
              {sort:{"createdAt": -1}})
              res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
            res.render("customer/services/service",{service:services,moment:moment})
          },
        serviceShow(req,res){

        }
    }
}
module.exports = serviceController