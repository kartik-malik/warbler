const mongoose =require('mongoose');
const user=require('./user');
const Message=require('./message');
mongoose.connect("mongodb://localhost/warbler",{
    keepAlive:true,
})
module.exports={
   user,
   Message,
   User:user,
}