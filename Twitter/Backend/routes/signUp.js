const express = require('express');
const app = express.Router();
var Model = require('../DatabaseConnection');
var mongooseTypes = require('mongoose').Types;


const bcrypt = require('bcrypt-nodejs');

//CustomerSignUp
app.post('/customerSignup', (req, res) => {
    console.log("In customer signup");
    console.log(req.body);
    const profileId = mongooseTypes.ObjectId();
    
    Model.Userdetails.findOne({
        'Username': req.body.userName
    }, (err, user) => {
    
        if (err) {
            console.log("Error in creating connection");
            res.writeHead(500, {
                'Content-type': 'text/plain'
            });
            res.end("Error in connecting connection");
        } else {

            if (user) {
                console.log('User Exists!', user);
            }
            else {
                var today = new Date();

                //Hashing Password!
                const hashedPassword = bcrypt.hashSync(req.body.userPassword);

                var user = new Model.Userdetails({
                    username: req.body.userName,
                    first_Name:req.body.Firstname,
                    last_name:req.body.Lastname,
                    password: hashedPassword,
                    email: req.body.userEmail,
                    city:req.body.userAddress,
                    zip:req.body.userZip,
                    description:'Add Description',
                    profile_image: 'default-profile-image.jpg',
                    created: today
                });
                console.log('User saved')
            }

            user.save()
            .then((doc) => {
                          console.log("User saved successfully.", doc);
                            res.send(true)})
            .catch((err) => {
                console.log("Unable to save user details.", err);
               
            });
        }
    });
});



module.exports = app;