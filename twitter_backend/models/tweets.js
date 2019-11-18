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
    required: true,
    unique:true
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
                type:String
            }
        ],
        replies:[
            {
                username:{type: String},
                content:{type:String},
                timestamp:{type : mongoose.Schema.Types.Date},
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