


function homePage(){
  return {
    index(req,res){
      res.render("index")
    },
    aboutUs(req,res){
      res.render("About")
    }

  }
}

module.exports = homePage
