const mongoose = require('mongoose');
const emailMongo = require('mongoose-type-email');
const userSchema = new mongoose.Schema({
       email:{
           type:String,
           required:true
       },
       firstName:{
           type:String,
           minlength:1,
           maxlength:100,
           required:true
       },
       lastName:{
        type:String,
        minlength:1,
        maxlength:100,
        required:true
       },
       userName: {
           type:String,
           minlength:1,
           maxlength:100,
           required: true
       },
        idNumber:{
         type:Number,
         length:16,
         required: true
     }, 
       tel:{
           type:String,
           minlength:10,
           maxlength:10,
           required:true
       },
       password:{
           type:String,
           minlength:8,
           maxlength:128,
           required:true
       },
       country:{
         type:String,
         required:true
       }
});

// exports.validateLogin = (data) =>{
//     const schema = {
//         email: Joi.sri
//     }
// }

module.exports.User = mongoose.model('User',userSchema);