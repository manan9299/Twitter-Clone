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

/*#endregion*/ 


//Using Multer object to save the Image Files
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
     kafka.make_request('users',req.body,(err,results)=>
        {
            
          if(err){
              res.json(err);
                  }
           else{
              res.json(results);
           }
        });
            
        
});

router.post('/tweet',async (req,res)=>{

   kafka.make_request('posttweet',req.body,(err,results)=>
        {
            
          if(err){
              res.json(err);
                  }
           else{
              res.json(results);
           }
        });
     
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