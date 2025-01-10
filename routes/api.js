// imports
const express = require('express');
const user = require('./user');

// Single routing
const router = express.Router();
router.use('/user', user);

module.exports = router;
