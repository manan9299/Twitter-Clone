'use strict';
/* #region Import Statements */
const express = require('express');
const sqlConnection = require('../../config/sqlConnection');
const Tweets = require("../../models/tweets");
const Users = require("../../models/users");
const Followers = require("../../models/followers");
const Lists = require("../../models/lists");
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

/**
 * @description This API will create a new Customer profile. 
 * In case if user enters the invalid details, we will send the 400 Bad Request along with the error messages
 */
router.post('/create-user',[
    check('username',"Please Enter your username").not().isEmpty(),
    check('first_name','Please Enter your First Name').not().isEmpty(),
    check('last_name','Please Enter your Last Name').not().isEmpty(),
    check('email','Your email is valid. Please check the format of your email.').isEmail(),
    check('city','Enter name of your city').not().isEmpty(),
    check('password','The length of the password must be 8 or more characters.').isLength({min:8}),
    ],async (req,res)=>{
       const err = validationResult(req);
       if(!err.isEmpty()){
            return res.status(400).json({
                errors:err.array()
            });
       }
       try{
            
           // const salt = await bcrypt.genSalt(10);
            //let password = await bcrypt.hash(req.body.password,salt);
            var query = `INSERT INTO users (username,first_name, last_name, city,zip,description,profile_image, email, password) VALUES (
                '${req.body.username}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.city}','${req.body.zip}','${req.body.description}','${req.body.profile_image}','${req.body.email}','${req.body.password}');`;            
            //sqlConnection.connect();
            sqlConnection.query(query,(err, rows) => {
                if(!err){
                    
                    var getUserQuery = `SELECT * FROM users WHERE username = '${req.body.username}'`;
                    let userData = null;
                    sqlConnection.query(getUserQuery,(err,rows,fields)=>{
                        userData = rows;
                        console.log(rows);
                    })
                    console.log("HELLO");
                    res.json(userData);
                }
                else{
                    res.json(err);
                }
            });
            //sqlConnection.end();
       }catch(err){
         
         console.error(err);
          res.status(500).send("Server error!");
       }    
});

router.post('/tweet',async (req,res)=>{
    try{

        let newTweet = {
            content : req.body.content,
            image: "",
            likeCount:0,
            replyCount:0,
            likedBy:[],
            replies:[],
            refTweetId : "",
            timestamp: Date.now()
        };

        let tweetObj = await Tweets.findOne({username:req.body.username});
        if(!tweetObj){
            tweetObj = new Tweets({username:req.body.username,tweets:[]});
            
        }

        tweetObj.tweets.push(newTweet);
        tweetObj.save();
        res.status(200).json(tweetObj);
    }catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// router.post('/tweet',async (req,res)=>{

// kafka.make_request('posttweet',req.body,(err,results)=> {
            
//         if(err){
//             res.json(err);
//                 }
//         else{
//             res.json(results);
//         }
//         });
    
// });

// router.get('/getPastTweets', (req, res)=>{

//     kafka.make_request('getPastTweets',req.body,(err,results)=> {
            
//         if(err){
//             res.json(err);
//                 }
//         else{
//             res.json(results);
//         }
//         });

// });
// with redis
// router.get('/getPastTweets', (req, res)=>{

//     try {
//         let reqUserName = req.body.username;
//         let userTweets = reqUserName + ':tweets';
//         console.log("user tweets ==> " + userTweets);

//         redisClient.get(userTweets, async (err, tweets) => {
//             if (tweets) {
//                 console.log(" ============== returning from redis cache =======");
//                 res.json({
//                     "tweets" : tweets
//                 })
//             } else {
//                 console.log(" ============== fetching tweets and writing to cache =======");
//                 let tweetObj = await Tweets.findOne({username: reqUserName}, {tweets : 1});
//                 let tweets = tweetObj.tweets;
//                 redisClient.set(userTweets, JSON.stringify(tweets), 'EX', 3600);
//                 let deleted = redisClient.del("userTweets");
//                 console.log(deleted);

//                 if (tweetObj){
//                     res.json({
//                         "tweets" : JSON.stringify(tweets)
//                     });
//                 } else {
//                     res.json({
//                         "tweets" : []
//                     })
//                 }
//             }
//         });
        
//     } catch (err){
//         console.error(err);
//         res.status(500).send("Server Error");
//     }
    
// });

router.get('/getPastTweets', async (req, res) => {

    try {
        let reqUserName = req.body.username;
        let tweetObj = await Tweets.find({username: {$regex : reqUserName}}, {tweets : 1});
        
        if (tweetObj){
            let tweets = tweetObj.tweets;
            res.json({
                "tweets" : tweets
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

router.post('/follow',async (req,res)=>{

    let token = req.header('Authorization').replace('Bearer ', '')
    let data = jwt.verify(token, constants.JWT_KEY)
    
    console.log("jwt data ==> ");
    console.log(JSON.stringify(data));
    
    try {

        let newFollowing = req.body.follow;
        let user = data.username;
        Followers.findOneAndUpdate(
            {
                username : user
            }, 
            { 
                $addToSet : {following : newFollowing}
            }, 
            {
                upsert : true,
                new : true
            }
        ).then((updatedFollowing) => {

            Followers.findOneAndUpdate(
                {
                    username : newFollowing
                }, 
                { 
                    $addToSet : {followers : user}
                }, 
                {
                    upsert : true
                }
            ).then((updatedFollowers) => {
                
                res.status(200).send(updatedFollowing);
            }).catch(error => {
                console.log("=== error ==> " + error.toString());
                res.status(200).send({
                    "error" : error
                })
            });
            
            // res.status(200).send(updatedFollowers);
        }).catch(error => {
            res.status(200).send({
                "error" : error
            })
        });
    }catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
        
});

router.post('/signup', [
    check('username',"Please Enter your username").not().isEmpty(),
    check('email','Your email is valid. Please check the format of your email.').isEmail()
    ], async (req,res)=>{

    try{
        
        let newUser = new Users({
            username : req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        newUser.save().then((user) => {
            // console.log(user);
            res.status(200).json(user);
        }).catch((error) => {
            console.log(error);
            if(error.code == 11000){
                res.status(200).send({
                    "error" : "username or email already registered"
                });
            } else {
                res.status(200).send({
                    "error" : "Unknown MongoDB Error"
                });
            }
        });

    } catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
    
});

router.post('/createList', async (req, res) => {

    try {
        let listName = req.body.listName;
        let username = "manan"

        let listObj = new Lists({
            username : username,
            listName : listName,
            members : []
        })
        
        listObj.save().then((listObj) => {
            res.status(200).json(listObj);
        }).catch(err => {
            console.log(err)
            res.status(200).json({
                "error" : "Failed to create list"
            });
        });
    } catch (err){
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.post('/searchUser', async (req, res) => {

    try {
        let reqUserName = req.body.username;

        let userObj = await Users.find({username: {$regex : reqUserName}}).limit(10);
        
        if (userObj){
            res.json({
                "user" : userObj
            });
        } else {
            res.json({
                "user" : []
            })
        }
    } catch (err){
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.post('/login',
    async (req,res)=>{
        try {
            let {username, password} = req.body;
    
            let userObj = await Users.findOne({username: username});

            if(userObj.password == password){
                let token = jwt.sign({username : username}, JWT_KEY);
                res.json({
                    "token" : token
                });
            } else {
                res.json({
                    "error" : "Invalid Password"
                })
            }
        } catch (err){
            console.error(err);
            res.status(500).send("Server Error");
        }
       
});


module.exports = router;