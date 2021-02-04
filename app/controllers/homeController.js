const Material = require("../models/materials")


function homePage(){
  return {
    index(req,res){
      res.render("index")
    },
    aboutUs(req,res){
      res.render("About")
    },
    mnf(req,res){
      res.render("manufacturing")
    }

  }
}

module.exports = homePage
