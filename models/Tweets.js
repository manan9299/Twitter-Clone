const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetsSchema = new Schema({
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
        }
    }
  ]

});

module.exports = Tweets = mongoose.model('Tweets', TweetsSchema);