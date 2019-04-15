const mongoose = require('mongoose');


 const mongooseSchema = new mongoose.Schema
 ({
   name:
   {
      type:String,
      required:true
   },
   receipe:
   {
      type:String,
      required:true
   },
   ingredients:
   {
      type:String,
      required:true
   },
   directions:
   {
      type:String,
      required:true
   }


 });




module.exports = mongoose.model('receipe', mongooseSchema);
