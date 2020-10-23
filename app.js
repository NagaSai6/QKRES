//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongodb_store = require("connect-mongo")(session);
const app = express();

// "mongodb://localhost:27017/QkResDB"
mongoose.connect(process.env.URL
  , {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function() {
  console.log("Successfully Connected to MongoServer");
});
mongoose.set("useCreateIndex", true);



const connection = mongoose.connection;

let mongoStore = new mongodb_store({
  mongooseConnection: connection,
  collection: "sessions"
})



app.set("view engine", "ejs");

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 730
  },

  // cookie valid for 1 month
}));


app.use(flash())

app.use(express.static("public"));

app.use(express.json())

app.use(express.urlencoded({
  extended: false
}))
app.use(bodyParser.urlencoded({ extended: true }));
// passport config

const passportInit = require("./app/config/passport")
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use((req, res, next) => {
  res.locals.session = req.session
  res.locals.user = req.user
  next()
})




require("./Routes/web.js")(app)





app.listen(process.env.PORT||3000,function(){
    console.log("Server is up on port 3000");
})
