
const homeServiceApi = require("../services/homeServicesApi");

function homePage(){
  return {
    index(req,res){
      homeServiceApi()
      res.render("index")
    }
  }
}

module.exports = homePage
