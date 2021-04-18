const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "1",
    database: "mina_app"
});
module.exports = db;

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!");
});
/*
db.end(function(err) {
    if (err) throw err;
    console.log("Closed!!!");
});
*/