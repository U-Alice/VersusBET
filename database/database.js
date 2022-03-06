const URL = "mongodb+srv://zesta:!!!%3F!%3F123Abana@versusbet.bwxby.mongodb.net/test"
const mongoose = require('mongoose')

module.exports.db = async() =>{ 
    mongoose.connect(URL)
}
