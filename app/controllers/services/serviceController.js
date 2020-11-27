function serviceController(){
    return{
        index(req,res){
            res.send("singleFile")
        }

    }
}
module.exports = serviceController