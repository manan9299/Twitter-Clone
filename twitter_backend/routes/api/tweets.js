'use strict';
/* #region Import Statements */
const express = require('express');
const sqlConnection = require('../../config/sqlConnection');
const Tweets = require("../../models/tweets");
const Users = require("../../models/users");
const Followers = require("../../models/followers");
const Lists = require("../../models/lists");
const Search = require("../../models/search");
const Joi = require('joi');
var ObjectId = require('mongoose').Types.ObjectId;

const jwt = require('jsonwebtoken');
var constants = require('../../lib/constants');
const JWT_KEY = constants.JWT_KEY;

var { check, validationResult } = require('express-validator');
// var redis = require('redis');
/*#endregion*/ 
// ==> redis code
// const redisClient = redis.createClient(6379);

// redisClient.on('connect', () => {
//     console.log("Connected to redis");
// });

const router = express.Router();

router.post('/postTweet', async (req, res) => {

    let token = req.header('Authorization').replace('Bearer ', '')
    let data = jwt.verify(token, constants.JWT_KEY)

    //validate tweet content (max 280 chars)
    const schema = Joi.object({
        content: Joi.string().trim().min(1).max(280).required()
        //imageUrl: Joi.string()....
    });

    const { error } = schema.validate({ content: req.body.content });
    if (error) throw err;
    else {

        // read username from jwt token
        let staticUsername = data.username;

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
            let tweetObj = await Tweets.findOne({ username: staticUsername });
            //if tweet array does not exist for current user, create one
            if (!tweetObj) {
                tweetObj = new Tweets({ username: staticUsername, tweets: [] });
            }
            //otherwise save current tweet into existing user's tweet array
            tweetObj.tweets.push(newTweet);
            tweetObj.save()
                .then(async (updatedTweet) => {
                    console.log("updatedTweet ==> ");
                    console.log(updatedTweet);
                    let userTweets = updatedTweet.tweets;
                    let latestTweet = userTweets[userTweets.length - 1];
                    let latestTweetContent = latestTweet.content;
                    latestTweetContent = latestTweetContent.toLowerCase();

                    let latestTweetId = latestTweet._id.toString();

                    let regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
                    let tags = [];
                    let match;

                    while ((match = regex.exec(latestTweetContent))) {
                        tags.push(match[1]);
                    }

                    for(let i = 0; i < tags.length; i++){
                        let updatedHashTagList = await Search.findOneAndUpdate(
                            {
                                hashTag : tags[i]
                            },
                            { 
                                $addToSet : {listTweets : latestTweetId}
                            },
                            {
                                upsert : true,
                                new : true
                            }
                        );
                        console.log(updatedHashTagList)

                        if(!updatedHashTagList){
                            console.log("error for tag : " + tags[i]);
                        }
                    }

                    console.log("latestTweet");
                    console.log(latestTweet);
                    res.status(200).json("Tweet saved!");
                })
                .catch(err => res.status(400).json(err))
            // console.log(tweetObj);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    }
});

router.get('/getTweets/:start', async (req, res)=>{

    try {
        let token = req.header('Authorization').replace('Bearer ', '')
        let data = jwt.verify(token, constants.JWT_KEY)

        let reqUserName = data.username;
        let startIndex = req.params.start
        let userObj = await Tweets.findOne({ username : reqUserName});
        let userTweets = userObj.tweets.slice(startIndex,startIndex+10).reverse();
        //let userTweets = await userObj.tweets.slice(startIndex,startIndex+10);
        // console.log(userTweets);
        res.json({
            tweets : userTweets,
            username : userObj.username
        });
/*
        redisClient.get(userTweets, async (err, tweets) => {
            if (tweets) {
                console.log(" ============== returning from redis cache =======");
                res.json({
                    "tweets" : tweets
                })
            } else {
                console.log(" ============== fetching tweets and writing to cache =======");
                let tweetObj = await Tweets.findOne({username: reqUserName}, {tweets : 1});
                let tweets = tweetObj.tweets;
                redisClient.set(userTweets, JSON.stringify(tweets), 'EX', 3600);
                let deleted = redisClient.del("userTweets");
                console.log(deleted);
                
                if (tweetObj){
                    res.json({
                        "tweets" : JSON.stringify(tweets)
                    });
                } else {
                    res.json({
                        "tweets" : []
                    })
                }
            }
        });
  */      
    } catch (err){
        console.error(err);
        res.status(500).send("Server Error");
    }
    
});

router.post("/updateLikes", (req, res) => {
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
});

router.post("/replyTweet", async (req, res) => {

    console.log("Api called")
    const schema = Joi.object({
        content: Joi.string().trim().min(1).max(280).required()
    });

    const { error } = schema.validate({ content: req.body.content });
    if (error) throw error;
    else {
        try {
            let targetTweet = null;
            let tweetObj = await Tweets.findOne({username:req.body.username});
            let tweetsArray = tweetObj.tweets;
            //console.log(req.body);
            for(let i = 0;i<tweetsArray.length;i++){
                if(tweetsArray[i]._id.toString() == req.body.tweetId){
                    targetTweet = tweetsArray[i];
                    let replyData = {
                        "reply_username":req.body.username,
                        "reply_content":req.body.content,
                        "timestamap":Date.now
                    };
                    targetTweet.replies.push(replyData);
                    console.log(targetTweet.replies);
                    break;
                }
            }
            console.log(targetTweet);
            tweetObj.save()
                .then(() => res.status(200).json("Tweet reply saved!"))
                .catch(err => {
                    console.error(err);
                    res.status(400).json(err);

                })
            
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    }
});

router.post('/getTweetsWithTag', async (req, res) => {

    try {
        let hashTag = req.body.hashTag;
        
        let hashTagSearch = await Search.findOne(
            {
                hashTag : hashTag
            }
        )
        console.log("hashTagSearch ==> ")
        console.log(hashTagSearch)
        
        if (hashTagSearch){
            let listTweetIds = hashTagSearch.listTweets;
            console.log(listTweetIds);

            let listTweetObjectIds = []

            for(let i = 0; i < listTweetIds.length; i++){
                listTweetObjectIds.push(new ObjectId(listTweetIds[i]));
            }
            console.log(listTweetObjectIds);

            Tweets.find({
                "tweets._id" : { $in : listTweetObjectIds}
            }).then((listTweets) => {
                console.log(listTweets)
                // console.log("tye of id ==> ")
                // console.log(listTweets[0].tweets[0]._id.toString());
                
                for(let i = 0; i < listTweets.length; i++){
                    
                    let matchingTweets = listTweets[i].tweets.filter((tweet) => listTweetIds.indexOf(tweet._id.toString()) >= 0);
                    console.log("matching Tweets ==> ");
                    console.log(matchingTweets)
                    listTweets[i].tweets = matchingTweets;
                }
                res.json({
                    "tweets" : listTweets
                });
            }).catch((err) => {
                console.log(err);
                res.json({
                    "error" : err.toString()
                });
            });

        } else {
            res.json({
                "tweets" : []
            })
        }
    } catch (err){
        console.error(err);
        res.status(500).send("Server Error");
    }
    
});

module.exports = router;