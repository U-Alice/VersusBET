const bodyParser = require('body-parser');
const cors = require('cors');
module.exports = (app)=>{
    app.use(function(req,res,next){
        options:{
            origin:req.headers.origin
        }
        cors(options)
        res.header('Access-Control-Allow-Origin',req.headers.origin),
        res.header('Access-Control-Allow-Credentials',true)
    })
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json())
}