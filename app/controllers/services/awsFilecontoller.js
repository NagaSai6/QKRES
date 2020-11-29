const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3();

aws.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype === "application/msword" ||file.mimetype === "application/pdf" || file.mimetype==="text/plain") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only Pdf and Microsoft word and .txt(notepad) is allowed!"), false);
    }
  };

  const upload = multer({
    fileFilter,
    storage: multerS3({
      acl: "private",
      s3,
      bucket: process.env.AWSBucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: "TESTING_METADATA" });
      },
      key: function (req, file, cb) {
        cb(null, Date.now()+"-"+ req.file.originalname);
      },
    }),
  });

  module.exports=upload
  