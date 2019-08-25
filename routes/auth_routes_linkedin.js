const router=require('express').Router();
const passport=require('passport');

router.get('/linkedin',passport.authenticate('linkedin'));

router.get('/linkedin/redirect',passport.authenticate('linkedin'),(req,res)=>{
    res.redirect('https://www.linkedin.com/company/analysed-in/about/');
});
module.exports=router;