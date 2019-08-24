const passport=require('passport');
const facebookStratergy=require('passport-facebook').Strategy;
const keys=require('./keys');
const User=require('../Models/User_Models');



passport.serializeUser((user,done)=>{
    console.log(user.id)
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
})
passport.use(
    new facebookStratergy({
        callbackURL:keys.facebook.callbackURL,
        clientID:keys.facebook.clientID,
        clientSecret:keys.facebook.clientSecret
    },  (acessToken,RefreshToken,profile,done)=>{
            console.log(profile);
            User.findOne({facebookID:profile.id}).then((currentUser)=>{
                if(currentUser){
                    console.log("Current User" + currentUser)
                    done(null,currentUser)
                }
                else{
                    new User({
                        displayName:profile.displayName,
                        facebookID:profile.id
                    }).save().then((newUser)=>{
                        done(null,newUser);


                    });
                    
                }

                    });
                })
            
    );
