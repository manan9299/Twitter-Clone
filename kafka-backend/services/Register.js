var express = require('express')
//var user = require('../../server/models/User')

function handle_request (msg, callback) {
  console.log('Inside Kafka Register')

        /*user.findOne({ email: msg.email }).then(user => {
                if (user) {
                    console.log('Email already exists!');
                    callback(null, user);
                } else {
                    const newUser = new user({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        restaurantname: req.body.restaurantname,
                        cuisine: req.body.cuisine,
                        zipcode: req.body.zipcode,
                        owner: req.body.owner
                    });
                        newUser.save()
                            .then(() => callback(err, 'Registered!'))
                            .catch(err => callback(err, null))
                }
            });*/
}
exports.handle_request = handle_request