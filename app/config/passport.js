require("dotenv").config();
const passport = require("passport")
const mongoose = require("mongoose")
const findOrCreate = require("mongoose-findorcreate");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy=require("passport-facebook").Strategy;
const User = require("../models/users");
const key = require("./keys")






function init(passport) {
  // passport.use(User.createStrategy());

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })



  passport.use("local-login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  }, async (email, password, done) => {

    await User.findOne({
      email: email
    }, function(err, user) {
      if (!user) {
        return done(null, false, {
          message: "No user found with this email"
        })
      }

      bcrypt.compare(password, user.password).then(match => {
        if (match) {
          return done(null, user, {
            message: "logged in"
          })
        }

        return done(null, false, {
          message: "Wrong email or password"
        })


      }).catch(err => {
        return done(null, false, {
          message: "Something Went wrong"
        })

      })

    })

  }));
 //
  passport.use(new GoogleStrategy({
      clientID: key.googleAuth.clientID,
      clientSecret: key.googleAuth.clientSecret,
      callbackURL: key.googleAuth.callbackURL
      // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
      // passReqToCallback: true
    },
 function(request, accessToken, refreshToken, profile, cb) {
    User.findOrCreate({
        googleId: profile.id,
        customerName:profile.displayName,
        email:profile.emails[0].value

      }, function(err, user) {

        return cb(err, user);
      });
    }
  ));



  passport.use(new FacebookStrategy({
      clientID: key.facebookAuth.clientID,
      clientSecret: key.facebookAuth.clientSecret,
      callbackURL: key.facebookAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOrCreate({
        facebookId: profile.id,
        customerName:profile.displayName

      }, function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
    }
  ));












}

module.exports = init
