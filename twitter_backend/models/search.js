const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

/**
 * @description Creates the Customer Schema
 *  
 * */
const SearchSchema = new mongoose.Schema({
  hashTag:{
    type: String,
    required: true,
    unique:true
  },
  listTweets:[{type : String}]
});

//Here the mongoose.model has two arguments 
// 1) the name of model 
// 2) the Schema which will be used 
module.exports = Search = mongoose.model('searches', SearchSchema);;