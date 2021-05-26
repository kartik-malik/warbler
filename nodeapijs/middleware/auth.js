require('dotenv');
const jwt=require('jsonwebtoken');
//make sure user is logged in -Authetication
exports.loginRequired=function(req,res,next){
try {
    console.log(req.headers);

    const token=req.headers.authorization.split(" ")[1];// Bearer
    jwt.verify(token,process.env.SECRET_KEY,function(err,decoded){
         if(decoded){
             return next();
         }
         else {
             return next({status:401,message:"Please login first"});
         }
    })
    
} catch (err) {
    next(err);
}
}
//make sure correct user is in -Authoriazation
exports.ensureCorrectUser = function(req, _res, next) {
    try {
        console.log(req.headers);
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, function(error, decoded) {
        if (decoded && decoded.id === req.params.id) {
          return next();
        } else {
          return next({
            status: 401,
            message: "Unauthorized"
          });
        }
      });
    } catch (error) {
      return next({
        status: 401,
        message: error.message
      });
    }
  };