const router=require('express').Router();
const passport=require('passport');

router.get('/facebook',passport.authenticate('facebook',{
    //authType: 'reauthenticate'
     scope: ['user_friends', 'manage_pages'] 
}));


router.get('/facebook/redirect',passport.authenticate('facebook'),(req,res)=>{
    res.redirect('https://www.facebook.com/teamanalysed/');
});
module.exports=router;