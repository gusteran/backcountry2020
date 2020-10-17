const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

const port = 3000;

// var fs = require('fs');
// var http = require('http');
// var https = require('https');
// var keyPath = path.resolve(__dirname, './sslcert/rootCA.key');
// var privateKey  = fs.readFileSync(keyPath, 'utf8');
// var certPath = path.resolve(__dirname, './sslcert/rootCA.pem');
// var certificate = fs.readFileSync(certPath, 'utf8');

// var credentials = {key: privateKey, cert: certificate};

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

app.listen(port, () => console.log('Starting server on port '+port));
// your express configuration here

// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

// httpServer.listen(port, () => console.log('Starting server on port '+port));
// httpsServer.listen(port, () => console.log('Starting SSL server on port '+port));