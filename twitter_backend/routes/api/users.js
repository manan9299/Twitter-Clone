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
       const err = validationResult(req);
       if(!err.isEmpty()){
           console.log(err.array());
           console.log("Error Found");
        return res.status(400).json({
            errors:err.array()
        });
       }
       try{
            
            const salt = await bcrpyt.genSalt(10);
            let password = await bcrpyt.hash(req.body.password,salt);
            var query = `INSERT INTO users (username,first_name, last_name, city,zip,description,profile_image, email, password) VALUES (
                '${req.body.username}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.city}','${req.body.zip}','${req.body.description}','${req.body.profile_image}','${req.body.email}','${password}');`;
            
            sqlConnection.query(query,(err, rows) => {
                if(!err){
                    
                    var getUserQuery = `SELECT * FROM users WHERE username = '${req.body.username}'`;
                    let userData = null;
                    sqlConnection.query(getUserQuery,(err,rows,fields)=>{
                        userData = rows;
                        console.log(rows);
                    })
                    res.json(userData);
                }
                else{
                    res.json(err);
                }
            });
       }catch(err){
         
         console.error(err);
          res.status(500).send("Server error!");
       }    
});
module.exports = router;