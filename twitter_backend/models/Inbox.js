const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InboxSchema = new Schema({
    message: {
        type: String,
        trim: true,
        default: ""
    },
    sender: {
        type: String
    },
    receiver: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Inbox = mongoose.model('Inbox', InboxSchema);