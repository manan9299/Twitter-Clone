/**
 * @author Dharmang Solanki
 * 
 */
'use strict';
/* #region Import Statements */
const express = require('express');
const sqlConnection = require('../../config/sqlConnection');
const Tweets =require("../../models/tweets");
const bcrypt = require("bcryptjs");
var { check, validationResult } = require('express-validator');
<<<<<<< Updated upstream
=======
const kafka = require('../kafka/client')


>>>>>>> Stashed changes
/*#endregion*/ 

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
<<<<<<< Updated upstream
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
=======
     kafka.make_request('users',req.body,(err,results)=>
        {
            
          if(err){
              res.json(err);
                  }
           else{
              res.json(results);
           }
        });
            
        
>>>>>>> Stashed changes
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
        

router.post('/login',[
    check('email','Please Enter your Email').not().isEmpty(),
    check('email','Your email is valid. Please check the format of your email.').isEmail(),
    check('password','Please password your Email').not().isEmpty(),
    ],
    async (req,res)=>{
       const err = validationResult(req);    
       if(!err.isEmpty()){
        return res.status(400).json({
            errors:err.array()
        });
       }
       
       try{
            // Step 1 : De-Struct the request body 
            
            var query = `SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}';`;
            //sqlConnection.connect();
            
            sqlConnection.query(query, async (err, row , fields) =>  {
                if(err){ 
                    console.error("Database error");
                    res.sendStatus(500);              
                }
                else if(row){

                    //const matches = await bcrypt.compare(row[0].password,req.body.password);
                    //if(){
                        //get all the details of that user
                        res.json(row[0]);
                        //return row[0];
                    //}
                    

                }  
                else{
                    res.send("Invalid Credentials!");
                }
            });
            //console.log(result);
            //sqlConnection.end();                
       
        }catch(err){

            console.error(err);
            res.sendStatus(500);
       }
       
});


module.exports = router;