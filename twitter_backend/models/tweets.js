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
        content:{type:String},
        image: {type:String},
        likeCount: {type:Number},
        replyCount: {type:Number},
        likedBy:[{type:String}],
        replies:[
          {
            reply_username:{type:String},
            reply_content:{type:String},
            timestamp:{type:mongoose.Schema.Types.Date}
          }
        ],
        refTweetId:{
            type:String
        },
        timestamp:{
            type : mongoose.Schema.Types.Date
        },
    }
  ]

});

//Here the mongoose.model has two arguments 
// 1) the name of model 
// 2) the Schema which will be used 
module.exports = Tweets = mongoose.model('tweets',TweetsSchema);;