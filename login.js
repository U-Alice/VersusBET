const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const URL = "mongodb+srv://zesta:!!!%3F!%3F123Abana@versusbet.bwxby.mongodb.net/test"
const {userSchema} = require('./userSchema.js')
const {generateToken} = require('./jwt')
const res = require('express/lib/response')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded(),{extended:true})

mongoose.connect(URL,()=>{
console.log('dbconnected')
})

app.post('/login',(req,res)=>{
    const {email, password} =req.body
    login({email, password}).then(user => {
        res.json(user)
    }).catch(err => next(err))
})
app.listen(PORT,()=>{
    console.log('connected')
})

async function login(password, email){

const user =  await userSchema.findOne({email, password})
if(!user){
    res.status(400).send({message: 'User not found'})
}
const isUnique = bcrypt.compare(password, user.password);
if(!isUnique){
    res.status(400).send({message: 'Invalid password'})
    
}
const token =generateToken(user.email, user._id)
return res.status(200).send({ success: true, message:"Logging successfully", data: user, token: token})
}