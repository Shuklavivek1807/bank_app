const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

dotenv.config({path:'./config.env'})
const dbUrl =process.env.DATABASE;
const PORT = process.env.PORT;

const connectionParams ={
 useNewUrlParser: true
};

mongoose
 .connect(dbUrl, connectionParams)
 .then(()=>{
    console.info("Connected to the DB");
 })
  .catch((e)=>{
    console.log("Error:",e);
  })