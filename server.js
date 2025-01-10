// imports
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./routes/api');

// intilization
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);

//routes
app.get('/', function (req, res) {
	res.send('<h1> Welcome to the Social Network </h1>');
});

app.listen(8000, () => {
	console.log('server started 8000');
});

mongoose
	.connect('mongodb://127.0.0.1:27017/social_network')
	.then(() => console.log('Connected!'));
