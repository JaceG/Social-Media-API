// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./routes/api');

// Initialize Express app
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount API routes
app.use('/api', api);

// Root route
app.get('/', function (req, res) {
	res.send('<h1>Welcome to the Social Network</h1>');
});

// Start server
app.listen(8000, () => {
	console.log('Server started on port 8000');
});

// Connect to MongoDB
mongoose
	.connect('mongodb://127.0.0.1:27017/social_network')
	.then(() => console.log('Connected to MongoDB!'))
	.catch((err) => console.error('MongoDB connection error:', err));
