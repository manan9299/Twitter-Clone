/**
 * @author Dharmang Solanki
 * 
 */
'use strict';
/* #region Import Statements */
const express = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const Tweets = require("../models/tweets");
const Joi = require('@hapi/joi');
var { check, validationResult } = require('express-validator');
const app = express.Router();

app.post('/postTweet',async (req,res) => {

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
            let tweetObj = await Tweets.findOne({ username: req.body.username });
            //if tweet array does not exist for current user, create one
            if (!tweetObj) {
                tweetObj = new Tweets({ username: req.body.username, tweets: [] });
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
});

app.post("/updateLikes", (req, res) => {
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

app.post("/replyTweet", async (req, res) => {

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

app.get("/viewReplies/:username/:tweetId", async (req, res) => {
 
    try {
            
            let replies = [];
            let tweetObj = await Tweets.findOne({username:req.params.username});
            let tweetsArray = tweetObj.tweets;
            
            for(let i = 0;i<tweetsArray.length;i++){
                if(tweetsArray[i]._id.toString() == req.params.tweetId){


                    console.log(tweetsArray[i].replies);
                    replies = tweetsArray[i].replies;
                    res.json(replies);
                    return;        
                }
            }
            
            
            
            
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    });

module.exports = app;