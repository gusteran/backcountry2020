const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  // port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// const init = "CREATE TABLE IF NOT EXISTS `customers` ("+
//   "id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,"+
//   "trips varchar(255) NOT NULL,"+
//   "likedTrips varchar(255) NOT NULL,"+
//   ") ENGINE=InnoDB DEFAULT CHARSET=utf8;"

// connection.query(init, function(err) {
//   if(err) throw err;
//   console.log("Init Table")
// });

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;