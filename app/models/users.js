const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate=require("mongoose-findorcreate")

const userSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true

  },
  password: {
    type: String
  },
  role:{
    type:String,
    default:"customer"
  },
  passwordChangedAt: {
    type: Date,
    select: false,
  },
  googleId: {
    type: String
  },
  googleToken: {
    type: String
  },
  facebookId: {
    type: String
  },
  facebookToken: {
    type: String
  },
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  timestamps: true
})

// userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = mongoose.model("User",userSchema)


module.exports=User
