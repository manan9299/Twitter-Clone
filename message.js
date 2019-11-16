const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    sender: {
        type: String
    },
    receiver: {
        type: String
    },
    content: {
        type: String,
        trim: true,
        default: ""
    },
    countMessagePerDay: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Message = mongoose.model('Message', MessageSchema);
