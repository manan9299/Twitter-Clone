const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    sender: {
        type: String
    },
    receiver: {
        type: String
    },
    message: {
        type: String,
        trim: true,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Message = mongoose.model('Message', MessageSchema);