"use strict";
exports.__esModule = true;
var mysql = require("mysql");
var db_config = require("../config/db_config.json");
var db = mysql.createConnection({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database
});
db.connect();
exports["default"] = db;
