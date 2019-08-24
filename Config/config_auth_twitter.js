const passport=require('passport');
const twitterStratergy=require('passport-twitter').Strategy;
const keys=require('./keys');
const User=require('../Models/User_Models');

passport.serializeUser((user,done)=>{
    done(null,user.id);
    console.log("The id is" + user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
})

passport.use(
    new twitterStratergy({
        callbackURL:keys.twitter.callbackURL,
        consumerKey:keys.twitter.consumerkey,
        consumerSecret:keys.twitter.clientSecret
    },
    (token,tokenSecret,profile,cb)=>{
        User.findOne({ twitterId: profile.id }).then((currentuser)=>{
            if(currentuser){
                console.log('Current User' + currentuser);
                done(null,currentuser);
            }
            else{
                new User({
                    displayName:cb.displayName,
                    twitterID:cb.id
                }).save().then((newUser)=>{
                    done(null,newUser);


                });
            }
            //return cb(err,user);
        })
    }
    )
)