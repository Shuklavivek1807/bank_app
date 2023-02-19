const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path');

require('./db/config')
const User = require("./db/User");
const Admin = require('./db/Admin');
const Transaction = require('./db/Transaction');
const app = express();
app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname,'.//build')))


//app.use use for post the data wich present in the body of postman.
//express.json is function

const PORT = 3004;

//Registration form User save data
app.post("/register",async (req,resp)=>{
    let user = new User(req.body) //store the server data
    let result =await user.save();

    result = result.toObject();
    delete result.pass;

    resp.send(result);
})

//admin save data
app.post("/admin",async (req,resp)=>{
    let user = new Admin(req.body) //store the server data
    let result =await user.save();

    result = result.toObject();
    delete result.pass;

    resp.send(result);
})

//Login page start
app.post("/login",async (req,resp)=>{
    if(req.body.pass && req.body.contact){
        let user =await User.findOne(req.body).select("-pass");
        if(user){
            resp.send(user)
        }else{
            resp.send({result:"user not found."})
        }
    }else{
        resp.send({result:"user not found."})
    }
})
app.post("/adminlogin",async (req,resp)=>{
    if(req.body.pass && req.body.contact){
        let user =await Admin.findOne(req.body).select("-pass");
        if(user){
            resp.send(user)
        }else{
            resp.send({result:"user not found."})
        }
    }else{
        resp.send({result:"user not found."})
    }
})
//login page end

//admin page list
app.get("/users",async (req,resp)=>{
    let list = await User.find( );
    if(list.length>0){
        resp.send(list)
    }else{
        resp.send({result:"No users"})
    }
})

//user delete
app.delete("/users/:id",async (req,resp)=>{
    const result = await User.deleteOne({_id:req.params.id})
    resp.send(result);
})


//get user for update
app.get("/users/:id",async (req,resp)=>{
    const result = await User.findOne({_id:req.params.id})
    if(result){
        resp.send(result);
    }else{
        resp.send({result:"User not found"});
    }
    
})

//update user
app.put("/users/:id",async (req,resp)=>{
    let result = await User.updateOne(
        {_id: req.params.id},
        {$set : req.body}
    )
    resp.send(result);
})


//admin page search
app.get("/search/:key",async (req,resp)=>{
    let result = await User.find({
        "$or" : [
            {fname: { $regex: req.params.key}}  
        ]
    })
    resp.send(result);
})





// User Transaction start

app.post("/ufind",async (req,resp)=>{
        let user =await User.findOne(req.body);
        if(user){
            resp.send(user)
        }else{
            resp.send({result:"user not found."})
        }
})

app.get("/wfind/:id",async (req,resp)=>{
    let list = await User.findOne({_id:req.params.id});
    if(list){
        resp.send(list)
    }else{
        resp.send({result:"No users"})
    }
})

app.put("/wupdate/:id",async (req,resp)=>{
    let result = await User.updateOne(
        {_id: req.params.id},
        {$set : req.body}
    )
    resp.send(result);
})

app.put("/uupdate/:id",async (req,resp)=>{
    let result = await User.updateOne(
        {_id: req.params.id},
        {$set : req.body}
    )
    resp.send(result);
})

// User transaction end

//transaction history
app.post("/transaction",async (req,resp)=>{
    let transaction = new Transaction(req.body)
    let result = await transaction.save()
    resp.send(result)
})

app.get("/transaction",async (req,resp)=>{
    let transaction = await Transaction.find( )
    if(transaction.length>0){
        resp.send(transaction)
    }else{
        resp.send({result:"No transaction"})
    }
})
app.get("/trans/:key",async (req,resp)=>{
    let result = await Transaction.find({
        "$or" : [
            {contact: { $regex: req.params.key}}  
        ]
    })
    resp.send(result);
})


//connect heroku

app.listen(PORT,()=>{
    console.log(`server runnnig ${PORT}`)
});