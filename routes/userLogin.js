module.exports=  function (app)
{
  // body...
        const UserModel = require('../models/user');

        const Receipe = require('../models/receipe');

        const bcrypt = require('bcryptjs');

        const passport = require('passport');

        const saltRounds = 10;

        app.get('/register',function (request,response)
        {
           console.log('get method');
           response.render('register');

        });
       /**
       */
        app.post('/registerPost',function (request,response)
        {
          console.log('post method');
          let errors =[];
          //check required fields
          if(!request.body.name||!request.body.email||!request.body.password||!request.body.confirmPassword)
           {
            errors.push({msg:'Pls fill all the fields'})
           }
         if(request.body.password !== request.body.confirmPassword)
           {
                errors.push({msg:'password doesnot match'});
           }
           if(request.body.password.length<6)
            {
              errors.push({msg:'password length is less than 6'})
            }
         if(errors.length>0)
         {
           console.log('errors.length');
           response.render('register',{errors:errors})
         }
         else
          {
                  console.log('errors not available');
                  let model =new UserModel
                  ({
                       name: request.body.name,
                       email: request.body.email,
                       password: request.body.password,
                       confirmPassword : request.body.confirmPassword
                  });
                  bcrypt.genSalt(10, function(err, salt)
                   {
                          bcrypt.hash(model.password, salt, function(err, hash)
                           {
                             if(err)
                               {
                                 console.log('err'+err);
                                 return;
                               }
                              // Store hash in your password DB.
                              model.password = hash;
                              model.save(function (err)
                               {
                                 if(err)
                                   {
                                     console.log(err);
                                   }
                                   else {
                                     response.redirect('/login');
                                   }
                              })
                          });
                      });
                    }
                 });


       //login get method
       app.get('/login', function(request,response)
       {
         console.log('login get method');
         response.render('login');
       });


       //login post method
       app.post('/login',function(request,response,next)
       {
         console.log('login post method');
         passport.authenticate('local',{
              successRedirect:'/dashboard',
              failureRedirect:'/login'
            })(request,response,next);
       });


     //DashBoard
     app.get('/dashboard',function(req,res,next)
      {
        console.log('dashboard'+req.user.name);
        Receipe.find({name:req.user.name},function (err, receipes) {

          if(err)
            {
              console.log('err'+err);
            }
            else {
                 res.render('dashboard',{user: req.user, receipes:receipes});
            }
        })



      });

     //Access Control
      function ensureAuthenticated(req, res, next)
      {
        if (req.isAuthenticated())
        {
          console.log('auth');
           return next();
      }
       else
        {
          console.log('redirect into login');
           res.redirect('/dashboard')
        }

      }



    app.post('/logout',function (request,response)
    {
         console.log('logout post method');
          request.logout();
          response.redirect('/login');
    });







};
