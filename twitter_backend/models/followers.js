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
const FollowersSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique:true
  },
  following:[{type : String}],
  followers:[{type : String}]
});

//Here the mongoose.model has two arguments 
// 1) the name of model 
// 2) the Schema which will be used 
module.exports = Followers = mongoose.model('followers', FollowersSchema);;