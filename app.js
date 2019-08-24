var express=require('express')
const mongoose=require('mongoose');
const passport=require('passport')
const keys=require('./Config/keys');
const passport_setup=require('./Config/config_auth');
const authRoutes=require('./routes/auth_routes');
const app=express()
const port=9000;
app.use(passport.initialize())



//Mongoose

mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser:true})
const db=mongoose.connection;
db.on('error',console.log.bind(console,'MongoDB error'))


// Others
app.use('/auth',authRoutes);

//Routes
app.get('/',(req,res)=>{
    res.render('Home.ejs');
})
app.listen(port,()=>{
    console.log("Listning to the port 9000!!!")
})