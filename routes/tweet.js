const Tweets = require("../models/Tweets");
const Joi = require('@hapi/joi');

exports.postTweet = async (req, res) => {

    //validate tweet content (max 280 chars)
    const schema = Joi.object({
        content: Joi.string().trim().min(1).max(280).required()
        //imageUrl: Joi.string()....
    });

    const { error } = schema.validate({ content: req.body.content });
    if (error) throw err;
    else {
        try {
            let newTweet = {
                content: req.body.content,
                image: req.body.imageUrl,
                likeCount: 0,
                replyCount: 0,
                likedBy: [],
                replies: [],
                refTweetId: "",
                timestamp: Date.now()
            };
            //note: req.body.username should be session
            let tweetObj = await Tweets.findOne({ username: req.session.ID });
            //if tweet array does not exist for current user, create one
            if (!tweetObj) {
                tweetObj = new Tweets({ username: req.session.ID, tweets: [] });
            }
            //otherwise save current tweet into existing user's tweet array
            tweetObj.tweets.push(newTweet);
            tweetObj.save()
                .then(() => res.status(200).json("Tweet saved!"))
                .catch(err => res.status(400).json(err))
            console.log(tweetObj);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    }
};

exports.updateLikes = (req, res) => {
    try {
        console.log('likes:' + req.body.likes);

        /*Tweets.findOneAndUpdate({ username: req.session.ID }, {'tweets.likeCount': req.body.likes}, function (err) {
            if (err) throw err;
            res.status(200).json('Updated likes!');
            console.log('Updated likes!!!');
        });*/
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.replyTweet = async (req, res) => {

    const schema = Joi.object({
        content: Joi.string().trim().min(1).max(280).required()
    });

    const { error } = schema.validate({ content: req.body.content });
    if (error) throw err;
    else {
        try {
            let tweetObj = await Tweets.findOne({ username: req.session.ID });
            tweetObj.tweets.replies.push(req.body.content);
            tweetObj.save()
                .then(() => res.status(200).json("Tweet reply saved!"))
                .catch(err => res.status(400).json(err))
            console.log(tweetObj);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    }
};

exports.getTweets = (req, res) => {
    try {
        Tweets.findOne({ username: req.session.ID }, (err, tweets) => {
            if (err) {
                throw err;
            } else if (tweets) {
                console.log(tweets);
                res.status(200).send(tweets);
            } else {
                return res.status(404).send("Can't fetch any tweets...");
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
