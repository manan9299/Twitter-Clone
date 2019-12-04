const User = require("../../models/users");
const Inbox = require("../../models/inbox");
const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
var constants = require('../../lib/constants');
const JWT_KEY = constants.JWT_KEY;


app.get('/viewUsers',(req, res) => {
    console.log("INSIDE VIEW USERS...");

    let token = req.header('Authorization').replace('Bearer ', '')
    let data = jwt.verify(token, constants.JWT_KEY)

    User.find({ username: { $ne: data.username } }, (err, users) => {
        if (err) {
            throw err;
        } else if (users) {
            console.log(users);
            res.status(200).send(users);
        } else {
            res.status(404).send("Can't find any users!");
        }
    }).limit(10);
});

app.post('/messageUser',(req, res) => {
    console.log('INSIDE SEND MESSAGE...');

    let token = req.header('Authorization').replace('Bearer ', '')
    let data = jwt.verify(token, constants.JWT_KEY)
    
    const newMessage = new Inbox({
        message: req.body.message,
        sender: data.username,
        receiver: req.body.user
    });
    newMessage.save()
        .then(() => res.status(200).json("Message sent!"))
        .catch(err => res.status(400).json(err))
});

app.post('/getChat', (req, res) => {
    console.log("INSIDE GET CHAT...");
    let token = req.header('Authorization').replace('Bearer ', '')
    let data = jwt.verify(token, constants.JWT_KEY)

    console.log("message req body ===> ")
    console.log(JSON.stringify(req.body));

    Inbox.find({
        $or: [
            { $and: [{ sender: data.username }, { receiver: req.body.user }] },
            { $and: [{ sender: req.body.user }, { receiver: data.username }] }
        ]
    }, (err, msgs) => {
        if (err) {
            throw err;
        } else if (msgs) {
            console.log(msgs);
            res.status(200).send(msgs);
        } else {
            res.status(404).send("Can't find any users!");
        }
    });
});

module.exports = app;