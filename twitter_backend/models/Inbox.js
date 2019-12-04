const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const InboxSchema = new mongoose.Schema({
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

module.exports = Inbox = mongoose.model('inbox', InboxSchema);