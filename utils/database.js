require('dotenv').config()
const URL =process.env.DB_URL;
const mongoose = require('mongoose')

module.exports.db = async() =>{ 
    mongoose.connect(URL)
    .then(_=>console.log("Connected to the db"))
    .catch(err => console.log(err))
}
