const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const routes = require('./routes');
require('dotenv').load();

const apiRouter = require('./routes/api/articles');

const app = express();

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytreact";
Promise = mongoose.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(routes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"))
}

mongoose.connect(MONGODB_URI, err => {
    if(err) console.log(err);
    else console.log(`Database Connected!`);
});

app.listen(PORT, err => {

    if (err) console.error(err);
    else {
        console.log(`API server listening on port ${PORT}`);
    }
});
