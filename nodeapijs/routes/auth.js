const router =require('express').Router();
const {signup,signin}=require('../handlers/auth');

router.post("/signup",signup);
module.exports=router;
router.post("/signin",signin);
