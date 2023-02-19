const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:String,
    tamount:String,
    memo:String,
    name:String,
    transID:String,
    contact:String
})  //define structue of object
module.exports = mongoose.model("Transaction",userSchema);