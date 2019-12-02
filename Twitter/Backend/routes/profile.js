const express = require('express');
const app = express.Router();
var Model = require('../DatabaseConnection');


const multer = require('multer');
const path = require('path');
const fs = require('fs');

//Storing documents/Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  }
  , filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

var passport = require('passport');
// Set up middleware 
var requireAuth = passport.authenticate('jwt', {session: false});



//get profile details
app.post("/getprofile", (req, res) => {
  console.log("Inside get profile");
  console.log(req.body)
  // console.log("req.body", req.body);
  // if (req.body.userEmail) {

  if (req.body.userEmail) {
    console.log(req.session.user.Email);
    
    Model.Userdetails.findOne({
      'email': req.session.user.Email
     }, (err, user) => {
          if (err) {
        console.log("Error while creating connection");
        res.writeHead(500, {
          "Content-type": "text/plain"
        });
        res.end("Error while creating connection");
      } else {
          if (err) {

            console.log("Error in retrieving profile data");

            res.writeHead(400, {

              "Content-type": "text/plain"

            });

            res.end("Error in retrieving profile data");

          } else {

            console.log("Profile data: ", user);
               res.writeHead(200, {

                  "Content-type": "application/json"

                });

                console.log("Profile data reterived");

                res.end(JSON.stringify(user));
          }

      }

    });

  }

  else {
    console.log("Error in retrieving profile data");

    res.writeHead(400, {

      "Content-type": "text/plain"

    });

    res.end("Error in retrieving profile data");
  }

});
 

//update profile
app.post("/updateprofile", (req, res) => {

  console.log("Backend update profile");




  if (req.body.userEmail) {

    Model.Userdetails.findOne({
      'Username': req.body.userName
    }, (err, user) => {

      if (err) {

        console.log("Error while creating connection");

        res.writeHead(500, {

          "Content-type": "text/plain"

        });

        res.end("Error while creating connection");
 
      } else {
        console.log('Userdetails', user);
    
                user.username = req.body.userName;
                user.first_Name = req.body.Firstname;
                user.last_name = req.body.Lastname;
                user.zip = req.body.Zip;
                user.password = req.body.Password;
                user.city = req.body.City;
                user.description = req.body.Description;
                user.ProfileImage = req.body.userImage;
    
                user.save()
                    .then((doc) => {
                         console.log("User details saved successfully.", doc);
                        //  callback(null, doc);
                        res.writeHead(200, {
                            'Content-type': 'text/plain'
                             });
                        res.end('Adding a user successful!');
                       
                        
                                    })
                     .catch((err) => {
                    console.log("Unable to save user details.", err);
                    // callback(err, null);
    
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                                        });
                     res.end('Error in adding an user');
                });
            }

       

        });

      }

    });

//uplaod-file
app.post('/upload-file', upload.array('photos', 5), (req, res) => {
  console.log('req.body', req.body);
  res.end();
});

//download-file
app.get('/download-file/:user_image', (req, res) => {
  var image = path.join(__dirname + '../../uploads', req.params.user_image);

  if (fs.existsSync(image)) {
    res.sendFile(image)
  }
  else {
    res.end("image not found")
  }
});


module.exports = app;