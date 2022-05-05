const mongoose = require('mongoose');
const jwt  = require('jsonwebtoken');
require('dotenv').config()
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
        NID:{
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
       },
       isAdmin:Boolean,
       activeBets:{
           type:Array,
       },
       cardNumber:{
           type:String
       },
       paymentMethod:{
           type:String,
       }
});
userSchema.methods.generateAuthToken = ()=>{
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin,NID:this.NID}, process.env.JWT_SECRET_KEY);
    return token;
}
module.exports.User = mongoose.model('User',userSchema);