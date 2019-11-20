/**
 * @author Dharmang Solanki
 */

var mysql = require('mysql');

const port = process.env.PORT || 3001;

const sqlConnection = mysql.createConnection({
    host:"twitter.cqrukkujf2fb.us-east-1.rds.amazonaws.com",
    user:'admin',
    password:'admin12345',
    database: 'TwitterDB'
});

/*
const sqlConnection = mysql.createPool({
    connectionLimit : 100, 
    host:"twitter.cqrukkujf2fb.us-east-1.rds.amazonaws.com",
    user:'admin',
    password:'admin12345',
    database: 'TwitterDB',
    debug    :  false
});*/

module.exports = sqlConnection;