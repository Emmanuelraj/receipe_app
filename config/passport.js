const User = require('../models/user');
const LocalStrategy= require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
//mongoose
const mongoose = require('mongoose');


mongoose.connect('mongodb://test:test@ds257579.mlab.com:57579/todoappli');


var db  = mongoose.connection;

db.on('error',function(err)
{
     if(err)
      {
        console.log('err'+err);
      }
});

db.once('open',function()
{
   console.log('connected to mlab db');
});





module.exports = function (passport)
{
     passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=>
   {
            let query = {email : email};
            User.findOne(query,function (err, user)
            {
              if(err)
                {
                  console.log('err'+err);
                  throw err;
                }
                if(!user)
                 {
                   return done(null,false,{message:'No User found'});
                 }

                        //Match password
                        bcrypt.compare(password,user.password,function (err,isMatch)
                        {
                          if(err)
                            {
                              throw err;
                            }
                          if(isMatch)
                            {
                              return done(null, user);
                            }
                          else {
                            return done(null,false,{message:'wrong password'});
                          }
                        });
            });
   }));



 passport.serializeUser(function (user,done)
 {
   done(null,user.id);

 })


 passport.deserializeUser(function (id,done)
 {

   User.findById(id,function (err, user)
   {
     done(err,user);
   })

 })

}
