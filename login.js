const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const URL = "mongodb+srv://zesta:!!!%3F!%3F123Abana@versusbet.bwxby.mongodb.net/test"
const {userSchema} = require('./userSchema.js')
const {generateToken} = require('./jwt')
// const res = require('express/lib/response')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect(URL)
.then(_ => console.log("Db connected..."))
.catch(err => console.log(err))

app.post('/login',async(req,res,next)=>{
    // const {email, password} =req.body
    const user =  await userSchema.findOne({email:email, password:password})
    async function login(password, email){
   
    const token =generateToken(user.email, user._id)
    res.status(200).json({ success: true, message:"Logging successfully", data: user, token: token})    
    const isUnique = bcrypt.compare(req.body.password, user.password);
    if(!isUnique){
        res.status(400).send({message: 'Invalid password'})
    }
   
   
    
       
        }
    login(req.body.email, req.body.password).then(user => {
        res.json(user)
    }).catch(err => next(err))
})
app.listen(PORT,()=>{
    console.log('connected')
})

