const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        default : "",
        type : String
    },
    following: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    }
});

module.exports = UserSchema = mongoose.model('UserSchema', UserSchema);