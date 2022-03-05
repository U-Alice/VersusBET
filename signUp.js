const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { userSchema } = require('./userSchema');
const app = express();
const PORT  = process.env.PORT || 4000;
const URL = "mongodb+srv://zesta:!!!%3F!%3F123Abana@versusbet.bwxby.mongodb.net/test?authSource=admin&replicaSet=atlas-ob0mnz-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
mongoose.connect(URL)
.then(_ => console.log("Connected successfully!Q..."))
app.use(bodyParser.json())
app.listen(PORT,()=>{
    console.log(`Listening on PORT: |${PORT}|`);
});

app.get('/',(req,res)=>{
    res.send("Hello world...")
});

app.post('/signUp',async(req,res)=>{
bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(req.body.password,salt,async(err,hash)=>{
        const result = await userSchema.findOne({email:req.body.email})
        if(result){
            return res.send("The email is taken !!!")
        }
        
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
      const transporter = nodemailer.createTransport({
          host:"smtp-mail.outlook.com",
          auth:{
              user:"hallcoder25@outlook.com",
              pass:"!!!?!?123Abana"
          },
          tls:{
              rejectUnauthorized:false,
          }
      });

      const options = {
          from:"hallcoder25@outlook.com",
          to:req.body.email,
          subject:"Node nodemailer test activity undergoing",
          text:`I can see you reading this ${req.body.firstName} `,
        //   html:`<h1>Your Favorite artist!!! Iriz wali iliz</h1>
        //      <img src="https://www.pinterest.com/pin/450219293980329785/?amp_client_id=CLIENT_ID%28_%29&mweb_unauth_id=%7B%7Bdefault.session%7D%7D&simplified=true"
        //   <p>I guess not so sure<p>
        //   <h4>Am I right?</h4>
        //   <a href="http://google.com">Yes</a>
        //   <a  href="http://igihe.com">Nah not right</a>
        //   `,
          
      }

      transporter.sendMail(options, (err,info)=>{
          if(err){
              console.log(err.message);
              return;
          }
          console.log("Sent"+ info.response);
      })
             res.send("User registered successfully")
        } catch (error) {
            res.send(error.message)
        }
    })
})
  
   

})