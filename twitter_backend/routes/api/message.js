const User = require("../../models/User");
const Inbox = require("../../models/Inbox");

exports.viewUsers = (req, res) => {
    console.log("INSIDE VIEW USERS...");

    User.find({ _id: { $ne: req.session.ID } }, (err, users) => {
        if (err) {
            throw err;
        } else if (users) {
            console.log(users);
            res.status(200).send(users);
        } else {
            res.status(404).send("Can't find any users!");
        }
    });
};

exports.messageUser = (req, res) => {
    console.log('INSIDE SEND MESSAGE...');

    const newMessage = new Inbox({
        message: req.body.message,
        sender: req.session.ID,
        receiver: req.body.user
    });
    newMessage.save()
        .then(() => res.status(200).json("Message sent!"))
        .catch(err => res.status(400).json(err))
};

exports.getChat = (req, res) => {
    console.log("INSIDE GET CHAT...");
    Inbox.find({
        $or: [
            { $and: [{ sender: req.session.ID }, { receiver: req.body.user }] },
            { $and: [{ sender: req.body.user }, { receiver: req.session.ID }] }
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
};