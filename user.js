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

//fetch all messages received by current user
exports.receiveMessage = (req, res) => {
    console.log("Receiving messages backend API");

    Message.find({ receiver: req.session.ID }, (err, msg) => {
        if (err) {
            throw err;
        } else if (msg) {
            res.status(200).send(msg);
        } else {
            res.status(404).send("No messages found in inbox!");
        }
    });
};