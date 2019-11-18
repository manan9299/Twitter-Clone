/**
 * @author Dharmang Solanki
 * 
 */

const mongoose = require('mongoose');

/**
 * @description Creates the Customer Schema
 *  
 * */
const TweetsSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  tweets:[
    {
        timestamp:{
            type : mongoose.Schema.Types.Date
        },
        content:{type:String},
        image: {type:String},
        likeCount: {type:Number},
        replyCount: {type:Number},
        likedBy:[
            {
                _id:{type:mongoose.Schema.Types.ObjectId},
                type:String
            }
        ],
        replies:[
            {
                _id:{type:mongoose.Schema.Types.ObjectId},
                reply_username:{type: String},
                reply_content:{type:String},
                reply_timestamp:{type : mongoose.Schema.Types.Date},
            }
        ],
        refTweetId:{
            type:String
        }
    }
  ]

});

//Here the mongoose.model has two arguments 
// 1) the name of model 
// 2) the Schema which will be used 
module.exports = Tweets = mongoose.model('tweets',TweetsSchema);;