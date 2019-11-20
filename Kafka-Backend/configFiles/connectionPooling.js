/**
 * @author Dharmang Solanki
 */

var mysql = require('mysql');

const port = process.env.PORT || 3001;

const sqlConnection = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'root',
    database: 'twitter'
});

module.exports = sqlConnection;