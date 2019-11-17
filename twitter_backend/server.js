/**
 * @author Dharmang Solanki
 * 
 */

/*#region Import Statements */

var express = require('express');
//var bodyParser = require('body-parser');
var session = require('express-session');
const connectToDataBase = require("./config/db");
const connectToSQL= require("./config/sqlConnection");
var cookieParser = require('cookie-parser');
var cors = require('cors');
/* #endregion*/

/*#region Congigure Express app */
const port = process.env.PORT || 3001;
var app = express();
app.use(express.json(
    {
        extends:false
    }));
//app.use(bodyParser.json());
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//app.use(cors({ origin: 'http://100.26.190.178:3000', credentials: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    next();
})
/*
app.use(session({
    secret: 'Nothing',
    resave: false,
    saveUninitialized: true
  }));*/
// Connect to database
connectToDataBase();

// Setting the routes
app.use('/users',require('./routes/api/users'));
//app.use('/tweets',require('./routes/api/tweets'));
//app.use('/auth',require('./routes/api/auth'));

/*#endregion*/

app.listen(process.env.PORT||port, () =>{
    if(process.env.PORT){
        console.log("Server running on host "+ process.env.PORT.toString());
    }
    else{
        console.log("Server running on host "+ port.toString());
    }
    
})
module.exports = app;