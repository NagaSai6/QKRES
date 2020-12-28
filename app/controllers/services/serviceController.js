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
            var random = Math.floor(Math.random() * 900000000000000000);
        
            fileName = random + '.' + userId +'.'+ fileName ;
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
                  ["content-length-range",0,15360000]
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
                  console.log(returnData);
                  res.write(JSON.stringify(returnData));
                  res.end();

              });
            

            
        }
    }
}
module.exports = serviceController