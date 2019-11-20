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
}

const err = validationResult(req);
       if(!err.isEmpty()){
           console.log(err.array());
           console.log("Error Found");
        return callback(err,null)
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
                    callback(null,userData)
                }
                else{
                    callback(err,null)
                }
            });
       }catch(err){
            callback(err,null)
       }    