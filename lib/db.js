var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'asdf',
    database: 'nyehuing'
});
db.connect();

module.exports = db;