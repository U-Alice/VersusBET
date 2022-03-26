const URL = "mongodb+srv://zesta:!!!%3F!%3F123Abana@versusbet.bwxby.mongodb.net/test"
// const URL ="mongodb://127.0.0.1:27107/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const mongoose = require('mongoose')

module.exports.db = async() =>{ 
    mongoose.connect(URL)
    .then(_=>console.log("Connected to the db"))
}
