/**
 * @author Dharmang Solanki
 * 
 */
'use strict';
/* #region Import Statements */
const express = require('express');
const sqlConnection = require('../../config/sqlConnection');
const bcrpyt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
var { check, validationResult } = require('express-validator');
const kafka = require('../kafka/client')

function handle_request(message, callback){
try{

       let newTweet = {
                   content : message.body.content,
                   image: "",
                   likeCount:0,
                   replyCount:0,
                   likedBy:[],
                   replies:[],
                   refTweetId : "",
                   timestamp: Date.now()
               };

       let tweetObj = await Tweets.findOne({username:message.body.username});
       if(!tweetObj){
           tweetObj = new Tweets({username:message.body.username,tweets:[]});
           
       }
       tweetObj.tweets.push(newTweet);
       tweetObj.save();
       callback(null,tweetObj)
    }catch(err){
       console.error(err);
       callback(err,null)
    }
} 

exports.handle_request = handle_request;