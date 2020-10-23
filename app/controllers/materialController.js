const Material = require("../models/materials")


function materialController(){
  return{
    elecHome(req,res){
      Material.find({"identity":"elec_home"},(err,elecs)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("elec",{elec:elecs})
        }
      })
    },
    mech(req,res){
      Material.find({"identity":"mech"},(err,mechs)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("mech",{mech:mechs})
        }
      })
    },
    dc(req,res){
      Material.find({"identity":"DC POWER SUPPLY"},(err,dcs)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/Dc",{dc:dcs})
        }
      })
    },
    demo(req,res){
      Material.find({"identity":"DEMONSTRATION MODELS"},(err,demos)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/demomodules",{demo:demos})
        }
      })
    },
    dmulti(req,res){
      Material.find({"identity":"DIGITAL MULTIMETER"},(err,dmultis)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/dmulti",{dmulti:dmultis})
        }
      })
    },
    dso(req,res){
      Material.find({"identity":"DIGITAL STORAGE OSCILLOSCOPE"},(err,dsos)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/dso",{dso:dsos})
        }
      })
    },
    etm(req,res){
      Material.find({"identity":"ELECTRONIC TRAINING MODULES"},(err,etms)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/etm",{etm:etms})
        }
      })
    },
    dm(req,res){
      Material.find({"identity":"DIGITAL METER"},(err,dms)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/dm",{dm:dms})
        }
      })
    },
    digiohm(req,res){
      Material.find({"identity":"DIGITAL OHM METER"},(err,digiohms)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/digiohm",{digiohm:digiohms})
        }
      })
    },
    oscilloscope(req,res){
      Material.find({"identity":"OSCILLOSCOPE"},(err,oscilloscopes)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/oscilloscope",{oscilloscope:oscilloscopes})
        }
      })
    },
    etb(req,res){
      Material.find({"identity":"ELECTRONIC TRAINING BOARD"},(err,etbs)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/etb",{etb:etbs})
        }
      })
    },
    typemeter(req,res){
      Material.find({"identity":"PORTABLE TYPE METER"},(err,typemeters)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/typemeter",{typemeter:typemeters})
        }
      })
    },
    decade(req,res){
      Material.find({"identity":"DECADE BOX"},(err,decades)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/decade",{decade:decades})
        }
      })
    },
    other(req,res){
      Material.find({"identity":"Other products"},(err,others)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/other",{other:others})
        }
      })
    }

  }
}


module.exports =materialController
