const guest = require("../app/middleware/guest")
const adminAuth=require("../app/middleware/admin")
const secure = require("../app/middleware/auth")
const order = require("../app/controllers/orderController")
const auth = require("../app/controllers/authController")
const cart = require("../app/controllers/cartController")
const material = require("../app/controllers/materialController")
const homePage = require("../app/controllers/homeController")
const adminOrder=require("../app/controllers/adminController")
const forgotPassword = require("../app/controllers/passwordResetController")
const chemical = require("../app/controllers/chemicals/chemicalController")
const statusController = require("../app/controllers/statusController")
const cancelRequest = require("../app/controllers/cancelOrderRequest/oCancelController")
const services = require("../app/controllers/services/serviceController")
const fileDownloadController = require("../app/controllers/fileDownloadController")
// const webhook = require("../app/controllers/messengerAPI/webhookController")
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

// mech services routes
  app.get("/mech",material().mech)

  app.get("/mech/:token",secure,material().mechForm)
  

  app.get("/sign-s3",secure,services().getSignedRequest)

  app.get("/qkres_chemicals",material().chemIndex)

// chemical Equipments routes

app.get("/chem",chemical().index)


app.get("/qkres_businessOpportunities",material().bsOpp)

// cart routes 

  app.get("/cart", cart().index)

  app.get("/delete_cart",secure,cart().delete_cart)

  app.get("/userDetails",secure,cart().userInfo)

  app.post("/update-cart", cart().update)

  app.post("/del_Items",secure,cart().delete_items_in_cart)

  app.post("/add_Items",secure,cart().add_items_to_cart)



 // local routes

 app.get("/register",guest, auth().register)

app.get("/profile",secure,auth().profile)

  app.post("/register",passport.authenticate("local-signup",{
    successRedirect:"/login",
    failureRedirect:"/register",
    failureFlash : true
  }))







  app.get("/login",guest, auth().login)
  app.post("/login",passport.authenticate("local-login",{
    successRedirect:"/profile",
    failureRedirect:"/login",
    failureFlash : true
  }))
  app.get("/logout",auth().logout)

  // third party authentication


app.get("/auth/google",passport.authenticate("google", { scope: ["profile", "email"] }))


  app.get("/auth/google/qkres",passport.authenticate("google", {
           successRedirect: "/profile",
           failureRedirect: "/register"
       }))



app.get("/auth/facebook",passport.authenticate("facebook", { scope: ["public_profile", "email"] }))

app.get("/auth/facebook/callback",passport.authenticate("facebook", {
         successRedirect: "/profile",
         failureRedirect: "/register"
     }))


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

app.get('/connect/local',secure,function(req, res) {
  res.render('connect-local.ejs', { message: req.flash('loginMessage') });
});
app.post('/connect/local',secure, passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));


  // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

////////////////// deactivate ///////////////////////////////////////////////

            app.get('/unlink/local', function(req, res) {
              var user            = req.user;
              user.local.email    = undefined;
              user.local.password = undefined;
              user.save(function(err) {
                  res.redirect('/profile');
              });
          });


          app.get('/unlink/google', function(req, res) {
            var user          = req.user;
            user.google.googleToken = undefined;
            user.save(function(err) {
               res.redirect('/profile');
            });
        });










// customer routes for materials
  app.post("/orders",secure,order().store)
app.get("/customer/orders",secure,order().index)
app.get("/customer/order/:id",secure,order().show)
// customer routes for services
app.post("/qkres_Services",secure,services().serviceFormInputs)
app.get("/customer/serviceOrders",secure,services().index)
app.get("/customer/serviceOrder/:id",secure,services().show)
// customer services routes
// app.post("/upload/single",services().serviceStore)
// app.get("/customer/services",secure,services().serviceIndex)
// app.get("/customer/service/:id",secure,services().serviceShow)


// cancel order request routes
app.post("/cancelOrderRequest",secure,cancelRequest().index)

// admin routes

app.get("/admin/orders",adminAuth,adminOrder().index)

app.get("/admin/services",adminAuth,adminOrder().serviceIndex)

app.post("/admin/order/status",adminAuth,statusController().update)

app.post("/admin/serviceOrder/status",adminAuth,statusController().serviceUpdate)

app.get("/admin/file/:fileName",adminAuth,fileDownloadController().index)

app.post("/admin/order/cancel",adminAuth,statusController().cancel)


// forgot password routes


app.get("/reset",forgotPassword().reset)

app.post("/reset",forgotPassword().recover)

app.get("/success",forgotPassword().success)

app.get("/forgot/:token",forgotPassword().afteremail)

app.post("/forgot/:token",forgotPassword().newEntries)


// ===================================================================================
// **************************** Messenger Api ***************************************
// ===================================================================================

// app.post("/webhook",webhook().index)
// app.get("/webhook",webhook().webGet)

// app.post("GetStartedInitiation",webhook().handleProfile)
// app.get("/GetStartedInitiation",webhook().getProfile)

app.get("/about-us",homePage().aboutUs)

app.get("/manufacturing-and-fabrication",material().mnf)

app.get("/welding-services/:id",material().weldingForm)

app.get("/electrical-discharge-machining-services/edm-services/:id",material().edmForm)

app.get("/water-jet-machining-services/:id",material().wjmForm)

app.get("/computer-numerical-control-services/cnc-services/:id",material().cncForm)

app.get("/casting-services/:id",material().castingForm)

app.get("/laser-cut-machining-services/:id",material().lcmForm)

app.get("/diamond-laser-cutting-services/:id",material().dlcForm)

}











module.exports = initRoutes
