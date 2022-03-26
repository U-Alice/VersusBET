const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const middlewareSetup = require('./middleware/middleware.js')
const { db } = require('./database/database.js')
const { setupRouter } = require('./routers/router.js')

middlewareSetup(app)
async function start(){
const database = await db()
setupRouter(app, database)
app.listen(PORT, ()=>{
    console.log(`Listening at port :${PORT}`);

})
app.get('/',(req,res)=>{
    res.send("Hello world...")
});
}
start().catch(console.error())
