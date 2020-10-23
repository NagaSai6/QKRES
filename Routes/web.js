const order = require("../app/controllers/orderController")
const guest = require("../app/middleware/guest")
const adminAuth=require("../app/middleware/admin")
const secure = require("../app/middleware/auth")
const auth = require("../app/controllers/authController")
const cart = require("../app/controllers/cartController")
const material = require("../app/controllers/materialController")
const homePage = require("../app/controllers/homeController")
const adminOrder=require("../app/controllers/adminController")
const passport = require("passport");




function initRoutes(app) {

  app.get("/", homePage().index)

// ***************** ELEC EQUIPMENTS *********************

  app.get("/elec",material().elecHome)

  app.get("/electricals/Dc",material().dc)

  app.get("/electricals/demomodules",material().demo)

  app.get("/electricals/dmulti",material().dmulti)

  app.get("/electricals/dso",material().dso)

  app.get("/electricals/etm",material().etm)

  app.get("/electricals/dm",material().dm)

  app.get("/electricals/digiohm",material().digiohm)

  app.get("/electricals/oscilloscope",material().oscilloscope)

  app.get("/electricals/etb",material().etb)

  app.get("/electricals/typemeter",material().typemeter)

  app.get("/electricals/decade",material().decade)

  app.get("/electricals/other",material().other)



  app.get("/mech",material().mech)



  app.get("/cart", cart().index)

  app.post("/update-cart", cart().update)

 // local routes

  app.get("/register",guest, auth().register)
  app.post("/register",auth().postRegister)
  app.get("/login",guest, auth().login)
  app.post("/login",auth().postLogin)
  app.get("/logout",auth().logout)

  // third party authentication
  //
  // app.get("/auth/google",auth().googlePostlogin)
app.get("/auth/google",passport.authenticate("google", { scope: ["profile", "email"] }))


  app.get("/auth/google/qkres",passport.authenticate("google", {
           successRedirect: "/",
           failureRedirect: "/register"
       }))



app.get("/auth/facebook",passport.authenticate("facebook", { scope: ["public_profile", "email"] }))

app.get("/auth/facebook/callback",passport.authenticate("facebook", {
         successRedirect: "/",
         failureRedirect: "/register"
     }))

// customer routes
  app.post("/orders",secure,order().store)
app.get("/customer/orders",secure,order().index)

// admin routes

app.get("/admin/orders",adminAuth,adminOrder().index)

}









module.exports = initRoutes
