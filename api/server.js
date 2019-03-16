const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./db');


const memoRoute = require('./routes/memo.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {useNewUrlParser: true})
.then(() => {
    console.log('Database is connected.');
}, (err) => {
    console.log('Can not connect to the database: ' + err);
});


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/memo', memoRoute);

let port = process.env.PORT || 4000;

const server = app.listen(port, function() {
    console.log('listening on port: ' + port);
});