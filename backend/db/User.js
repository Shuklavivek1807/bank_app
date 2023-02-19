const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    date:String,
    pass:String,
    email:String,
    gender:String,
    contact:Number,
    balance:Number,
    address:String
})  //define structue of object
module.exports = mongoose.model("User",userSchema);
//model is wrapper of mongoose schema , by this we do CRUD oeration.