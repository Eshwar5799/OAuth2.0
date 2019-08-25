const passport=require('passport');
const linkedinStratergy=require('passport-linkedin')
const keys=require('./keys');
const User=require('../Models/User_Models')


passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
})
passport.use(
    new linkedinStratergy({
    consumerKey:keys.linkedin.clientID,
    consumerSecret:keys.linkedin.clientSecret,
    callbackURL:keys.linkedin.callbackURL
},
(token,tokenSecret,profile,done)=>{
    console.log(profile);
    User.findOne({linkedinId:profile.id}).then((currentUser)=>{
        if(currentUser){
            console.log("Current User" + currentUser)
            done(null,currentUser)
        }
        else{
            new User({
                displayName:profile.displayName,
                linkedinId:profile.id
            }).save().then((newUser)=>{
                done(null,newUser);


            });
            
        }

            });
        })
    
);