const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  passwordChangedAt: {
    type: Date,
    select: false,
  },
  google_id: {
    type: String
  },
  google_token: {
    type: String
  },
  facebook_id: {
    type: String
  },
  facebook_token: {
    type: String
  },
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  timestamps: true
})

const User = mongoose.model("User",userSchema)


module.exports=User
