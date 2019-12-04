/**
 * @author Manan Shah
 * 
 */

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

/**
 * @description Creates the Customer Schema
 *  
 * */
const ListsSchema = new mongoose.Schema({
  username : {
    type: String,
    required: true,
    unique:true
  },
  listName : {type : String},
  members : [{type : String}]
});

//Here the mongoose.model has two arguments 
// 1) the name of model 
// 2) the Schema which will be used 
module.exports = Lists = mongoose.model('lists', ListsSchema);;