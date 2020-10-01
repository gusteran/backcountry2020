const express = require("express");
const cors = require('cors');
const app = express();

const port = 3000;

app.use(cors());

app.get('/db/', (req, res) => {
    res.send('Hello World, from express');
});

app.put('/db/', (req, res) => {
    res.send('Hello World, from express');
});

app.listen(port, () => console.log('Starting server'));