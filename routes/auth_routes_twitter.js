const router=require('express').Router()
const passport=require('passport');



router.get('twitter',passport.authenticate('twitter'));


// callback
router.get("?source=twitter",passport.authenticate('twitter'),(req,res)=>{
    res.redirect('https://twitter.com/TeamAnalysed')
});

module.exports=router;

