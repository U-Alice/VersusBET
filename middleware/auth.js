const jwt  = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(req,res,next){
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        message:'NO  token found!',
        status:'failed',
    })
    try {
        const payLoad = jwt.verify(token, process.env.JWT_sECRET_KEY);
        req.user = payLoad;
        next()
        
    } catch (error) {
         return res.status(401).json({
             message:"Invalid token provided",
             status:'failed'
         });
    }
}