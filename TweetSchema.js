const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    username: {
        type: String
    },
    timestamp: {
        type: Timestamp
    },
    content: {
        type: String,        
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    likesCount: {
        default: 0,
        type: Int32
    },
    replyCount: {
        default: 0,
        type: Int32
    },
    likedBy: {
        default : [],
        type: Array 
    },
    replies: {
        type: Array,
        default: []
    },
    refTweetId: {
        type: String,
        default: ""
    }
});

module.exports = Tweet = mongoose.model('Tweet', TweetSchema);