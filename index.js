const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 4040
const middlewareSetup = require('./middleware/middleware.js')
const { db } = require('./utils/database.js')
const { setupRouter } = require('./routes/user.js')
const { User } = require('./models/userSchema.js')
app.listen(PORT, ()=>{
    console.log(`Listening at port :${PORT}`);
})
middlewareSetup(app)
function start(){
const database =  db();
setupRouter(app, database)
}
app.get('/',(req,res)=>{
     return res.send("Hello world...")
});
app.get('/users',async(req,res)=>{
    const users = await User.find({});
    res.send(users)
});
start()
