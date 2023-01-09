// import
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const { config } = require('dotenv');
var bodyParser=require("body-parser");

const app= express();
const PORT= process.env.PORT || 4000;

// Database Connection
mongoose.connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 });
const db = mongoose.connection;
db.on('error',(error)=> console.log(error));
db.once('open',()=> console.log('connect to the database !'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(session
   ({
       secret:"my secret key",
       saveUninitialized:true,
       resave:false,
   })
   );
app.use((req,res,next)=>{
   res.locals.message=req.session.message;
   delete req.session.message;
   next();
});

app.use(express.static('uploads'));
 // template engine
 app.set("view engine","ejs"); 

 app.use("", require("./routes/routes")); 

 

app.listen(PORT, () => {
  console.log(`Services started at http://localhost:${PORT}`)
});




