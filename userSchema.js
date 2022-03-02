const mongoose = require('mongoose');
const emailMongo = require('mongoose-type-email');
const userSchema = new mongoose.Schema({
       email:{
           type:mongoose.SchemaTypes.Email,
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

module.exports.userSchema = mongoose.model('users',userSchema);