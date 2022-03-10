const mongoose = require('mongoose')
const { resetPassword, resetPasswordToken } = require('../handlers/userservices.js')

const password = new mongoose.Schema({
email:{
    type:String,
    required: true
},
User_id:{
    type:String,
    required: true
},
resetPasswordToken:{
    type:String,
    required: true, 
},
expireTime:{
    type: String,
    required: true
}

})
passwordReset.methods.resetPasswordToken = resetPasswordToken();

module.exports.password = mongoose.model('passwordReset', password)