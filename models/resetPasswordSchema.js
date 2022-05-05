const mongoose = require('mongoose')
const { resetPassword } = require('../controllers/userController.js')

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


module.exports.Password = mongoose.model('passwordReset', password)