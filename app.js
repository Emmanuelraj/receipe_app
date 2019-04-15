//require express
const express    = require('express');
//call express
const app        = express();
//path
const path       = require('path');
//mongoose
const mongoose   = require('mongoose');
//bodyParser
const bodyParser = require('body-parser');
//passport
const passport   = require('passport');
//routes
const userLogin  = require('./routes/userLogin');
//express-session
const session    = require('express-session');
//receipe routes
const receipeRoutes = require('./routes/receipeRoutes');
//port_no
const port_no = process.env.PORT || 5000;



mongoose.connect('mongodb://test:test@ds257579.mlab.com:57579/todoappli');


var db = mongoose.connection;

db.on('err',function (err)
 {
   console.log('error on DB'+err);
})


//db.once the connect
db.once('connect',function()
{
  console.log('mlab db connected');

})
//set ejs
app.set('view engine','ejs');

//public folder
app.use(express.static(path.join(__dirname, 'public')))
// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));


//middleware for body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


require('./config/passport')(passport);


app.use(passport.initialize());
app.use(passport.session());




userLogin(app);
receipeRoutes(app);



app.listen(port_no);


console.log('server listen to the port '+port_no);
