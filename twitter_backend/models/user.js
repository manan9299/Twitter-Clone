var Users = mongoose.model('Users', {
    'username': {
        type: String
    },
    'firstName': {
        type: String,
        required: true
    },
    'lastName': {
        type: String,
        required: true
    },
    'email': {
        type: String,
        required: true
    },
    'password': {
        type: String,
        required: true
    },
    'profileImage': {
        type: String,
        required: true
    },
    'zip': {
        type: String,
        required: true
    },
    'city': {
        type: String
    },
    'description': {
        type: String
    },
    'created': {
        type: String
    }
});
//module.exports = {Users};

module.exports = mongoose.model('Users',user);