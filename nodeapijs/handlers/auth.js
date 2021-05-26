const db=require('../models/index');
const jwt =require('jsonwebtoken');


exports.signup=async function(req,res,next){

    try {
     let user=await db.user.create(req.body);
     let {id,username,profileImageUrl}=user;
    
     let token =jwt.sign({
         id,
         username,
         
        },process.env.SECRET_KEY);
        res.status(200).json({
            id,
            username,
            profileImageUrl,
            token,

        })
    }
    catch(err) {
      if(err.code==11000){
          err.message="sorry that username email is already taken";

      }
      return next({status:400,message:err.message})
    }
}
exports.signin=async function(req,res,next){
  
  try {
    let user=await db.user.findOne({
        email:req.body.email
    })
    let {id,username,profileImageUrl,email}=user;
    console.log(db.user.comparePassword);
    let isMatch= await user.comparePassword(req.body.password);
    if(isMatch){
      let token =jwt.sign({
          id,
          username,
          
         },process.env.SECRET_KEY);
        return  res.status(200).json({
             username,profileImageUrl,token,email,id
         })   
         
    }
    else {
      return next({status:400,message:'Invalid email/password'});
  } 
    

  } catch (err) {
    return next(err);

  }
   
}
