const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


dotenv.config()

function generateToken(email, id, country){
    jwt.sign({
        email: email,
        id: id,
        country: country}, process.env.JWT_SECRET_KEY, {expiresIn: '12h'})
}

function authenticateToken(req,res){
    const authHeader = req.header['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) res.sendStatus(401).json({message: Error})

    jwt.verify(token,process.env.JWT_SECRET_KEY,(err, user)=>{
        if(err){
        res.sendStatus(403)
        console.log(err)
        }else{
            req.user = user
        }

    })
}

module.exports = {
    generateToken,
    authenticateToken
}