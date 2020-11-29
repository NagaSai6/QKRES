//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const request = require("request")

const flash = require("express-flash");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const emitter = require("events")
const bcrypt = require("bcrypt");
const saltRounds = 10;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongodb_store = require("connect-mongo")(session);
const app = express();
// process.env.URL
mongoose.connect("mongodb://localhost:27017/QkResDB"
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

// event emiiter

const eventEmitter= new emitter()

app.set("eventEmitter",eventEmitter)

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

app.use((req,res)=>{
     res.status(404).render("error/404")
})





const server = app.listen(process.env.PORT||4000,function(){
    console.log("Server is up on port 4000");
})




const io = require("socket.io")(server)

io.on("connection",(socket)=>{
        // console.log(socket.id);
        socket.on("join",(orderId)=>{
          // console.log(room);
           socket.join(orderId)
        })
})

eventEmitter.on("orderUpdated",(data) =>{
  io.to(`order_${data.id}`).emit("orderUpdated",data)
})

eventEmitter.on("orderPlaced",(data) =>{
  io.to("adminRoom").emit("orderPlaced",data)
})

eventEmitter.on("requestforCancellation",(data)=>{
  io.to("adminRoom").emit("requestforCancellation",data)
})