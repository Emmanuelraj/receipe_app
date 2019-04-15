module.exports = function (app)
{

           const receipeModel = require('../models/receipe');
           /**
             Add Receipe post method
           */
           app.post('/addRecipe',function (request,response)
           {
              console.log('addRecipe post method');
              new receipeModel({
                 name: request.user.name,
                 receipe: request.body.receipe,
                 ingredients: request.body.ingredients,
                 directions:request.body.directions
              }).save(function(err)
              {
                if(err)
                  {
                    console.log('err'+err);
                  }
                  else
                  {
                        response.redirect('/dashboard')
                  }
              });
           });
           /**
           editReceipeById
           */
           app.post('/update/:id',function (request,response)
           {
              console.log('editReceipeById'+ request.params.id);
              receipeModel.update({_id:request.params.id},request.body,function (err)
              {
                if(err)
                  {
                    console.log(err);
                  }
                 else {
                   response.redirect('/dashboard');
                 }
              });
           });




          //deleteById
          app.get('/delete/:id',function (request,response)
          {
            console.log('deleteById'+request.params.id);
            receipeModel.remove({},function (err, receipes)
            {
                 if (err)
                 {
                   console.log('err'+err);
                    response.json(err);
                 }
                 else
                 {
                   console.log('delete');
                    response.redirect('/dashboard');
                 }
            });
          });


          //editReceipeById
          app.get('/edit/:id',function (request,response)
          {
             console.log('editReceipeById'+ request.params.id);

             receipeModel.findById({_id:request.params.id},function (err, receipes)
             {
                if(err)
                  {
                      console.log('err'+err);
                       response.json(err);
                  }
                  else
                  {
                      response.render('editById',{title:'Edit Receipe',receipes: receipes});
                  }

             })
          });



}
