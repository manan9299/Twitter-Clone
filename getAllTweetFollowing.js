const Tweet = require("./Tweet");

exports.getAllTweetFollowing = (req, res) => {
    console.log("Inside getAllTweet of Following");
    var tweetOwnerUsername = req.body.username;
    Tweet.find({ username: tweetOwnerUsername }, (err, result) => {
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