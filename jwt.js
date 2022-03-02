const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const req = require('express/lib/request')
const res = require('express/lib/response')

dotenv.config()

function generateToken(email, password){
    jwt.sign({data:email,password}, process.env_JWT_SECRET_KEY, {expiresIn: '12h'})
}

function authenticateToken(req,res,next){
    const authHeader = req.header['authorization']
    if(!token) res.sendStatus(401).json({message: Error})

    jwt.verify(token,process.env_JWT_SECRET_KEY,(err, user)=>{
        if(err){
            res.sendStatus(403)
        console.log(err)
        }else{
            req.user = user
        }
        next()
    })
}