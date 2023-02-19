const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    date:String,
    pass:String,
    email:String,
    gender:String,
    contact:Number,
    address:String
})  //define structue of object
module.exports = mongoose.model("Admin",userSchema);