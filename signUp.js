const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { userSchema } = require('./userSchema');
const app = express();
const PORT  = process.env.PORT || 4000;
const URL = "mongodb+srv://zesta:!!!%3F!%3F123Abana@versusbet.bwxby.mongodb.net/test?authSource=admin&replicaSet=atlas-ob0mnz-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
mongoose.connect(URL)
.then(_ => console.log("Connected successfully!Q..."))

app.listen(PORT,()=>{
    console.log(`Listening on PORT: |${PORT}|`);
});

app.get('/',(req,res)=>{
    res.send("Hello world...")
});

app.post('/signUp',async(req,res)=>{
bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(req.body.password,salt,async(err,hash)=>{
        try {
            const user = new userSchema({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                tel:req.body.tel,
                country:req.body.country,
                password:hash
            });
             await user.save()
        } catch (error) {
            res.send(error.message)
        }
    })
})
  
   

})