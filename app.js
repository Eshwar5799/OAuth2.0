var express=require('express')
const mongoose=require('mongoose');
const passport=require('passport')
const keys=require('./Config/keys');
const passport_setup=require('./Config/config_auth');
const passport_setup_twitter=require('./Config/config_auth_twitter')
const passport_setup_linkedin=require('./Config/config_auth_linkedin')
const authRoutes=require('./routes/auth_routes');
const authRoutestwitter=require('./routes/auth_routes_twitter')
const authRouteslinkedin=require('./routes/auth_routes_linkedin');
const app=express()
const port=9000;
var session=require('express-session');

// Express session for twitter
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())



//Mongoose

mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser:true})
const db=mongoose.connection;
db.on('error',console.log.bind(console,'MongoDB error'))







// Others facebook
app.use('/auth',authRoutes);
// Others twitter different form
app.use('/auth',authRoutestwitter);

// Others linkedin
app.use('/auth',authRouteslinkedin);

//Routes
app.get('/',(req,res)=>{
    res.render('Home.ejs');
})
app.listen(port,()=>{
    console.log("Listning to the port 9000!!!")
})