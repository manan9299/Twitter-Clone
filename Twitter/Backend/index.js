const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const login = require('./routes/login');
const signUp = require('./routes/signUp');
const profile = require('./routes/profile');

const logout = require('./routes/logout');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(cors());
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./local');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// setup session variable
app.use(session({
    secret: 'grubhub_app',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 100,
    activeDuration: 5 * 60 * 100
}));

//Allow access control headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Signup
app.use('/', signUp);

//Login
app.use('/', login);

//profile
app.use('/profile', profile);


//logout
app.use('/', logout);

app.listen(3001, () => {
    console.log('server is running on port 3001');
});