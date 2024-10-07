mysql = require("mysql2");

// Database connection
var db = null;

// Connect to the database
function start_connect() {
  db = mysql.createConnection({
    host: "localhost",
    user: "karot_root",
    password: "efreikarot240",
    database: "karot",
  });
}

module.exports = { db, start_connect };
