const TweetSchema = require("./TweetSchema");

exports.getAllTweetFollowing = (req, res) => {

    console.log("Find the array of following");
    

    console.log("Inside getAllTweet of Following");
    var tweetOwnerUsername = req.session.username;
    TweetSchema.find({ username: tweetOwnerUsername }, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.writeHead(200, {
                "content-type": "application/json"
              });
              res.end(JSON.stringify(result));
        } 
    });
};