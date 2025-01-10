// imports
const express = require('express');
const { body } = require('express-validator');
const { create, update, remove, getAll } = require('../controllers/user');

// Single routing
const router = express.Router();

// Register Route with Password Hashing
router.post(
	'/',
	[
		body('username')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Please enter your username.'),
		body('email').isEmail().withMessage('Please enter a valid email.'),
	],
	create
);

router.put(
	'/:id',
	[
		body('username')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Please enter your username.'),
	],
	update
);

router.delete(
	'/:id',

	remove
);

router.get('/all', getAll);

module.exports = router;
