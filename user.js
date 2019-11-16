const Message = require("../models/Message");

//send a message from current user to another user
exports.sendMessage = (req, res) => {
    console.log('Sending messages backend API');

    const newMessage = new Message({
        sender: req.session.ID,
        receiver: req.body.receiver,
        message: req.body.message
    });
    newMessage.save()
        .then(() => res.status(200).json("Message sent!"))
        .catch(err => res.status(400).json(err))
};

//fetch all messages sent to current user
exports.viewMessage = (req, res) => {
    console.log("Viewing messages backend API");

    Message.find({ receiver: req.session.ID }, (err, reply) => {
        if (err) {
            throw err;
        } else if (reply) {
            res.status(200).send(reply);
        } else {
            res.status(404).send("No messages found in inbox!");
        }
    });
};