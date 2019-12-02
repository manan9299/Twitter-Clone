const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/HomeAway');
mongoose.connect("mongodb+srv://venky:Sunny@cluster0-bqswl.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
var Userdetails = mongoose.model('Userdetails', {
    'username' : {
        type: String
    },
    'first_Name' : {
        type: String,
        required: true
    },
    'last_name' : {
        type: String,
        required: true
    },
    'email' : {
        type: String,
        required: true
    },
    'password' : {
        type: String,
        required: true
    },
    'profile_image' : {
        type : String,
        required: true
    },
    'zip' : {
        type : String,
        required: true
    },    
    'city' : {
        type : String
    },
    'description':{
        type : String
    },
    'created' : {
        type : String
    }
});



module.exports = {
    Userdetails
};
