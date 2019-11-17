const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema({    
    tweets: {
        type: Array,
        default: []
    }
});

module.exports = TweetSchema = mongoose.model('TweetSchema', TweetSchema);