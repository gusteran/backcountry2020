const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

const port = 3000;

app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

// app.put('/', (req, res) => {
//     res.send('Hello World, from express');
// });

require("./app/routes/user.routes.js")(app);
require("./app/routes/trip.routes.js")(app);

// const mysql = require("mysql");
// const dbConfig = require("./app/config/db.config.js");

// const connection = mysql.createConnection({
//     host: dbConfig.HOST,
//     port: dbConfig.PORT,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
//   });

// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE tripdata';
//     connection.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send("Database created");
//     })
// });

app.listen(port, () => console.log('Starting server on port '+port));