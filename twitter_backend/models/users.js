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
const UserSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique:true
  },
  firstName:{type:String},
  lastName: {type:String},
  city: {type:String},
  zip: {type:String},
  description: {type:String},
  profileImage: {type:String},
  email: {type:String},
  password: {type:String}
});

//Here the mongoose.model has two arguments 
// 1) the name of model 
// 2) the Schema which will be used 
module.exports = Tweets = mongoose.model('users',UserSchema);;