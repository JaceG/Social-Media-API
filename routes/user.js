// Import required dependencies
const express = require('express');
const { body } = require('express-validator');
const {
	create,
	update,
	remove,
	getAll,
	getUserById,
	addFriend,
	removeFriend,
} = require('../controllers/user');

const router = express.Router();

// POST /api/users - Create new user
// Validates username and email
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

// PUT /api/users/:id - Update user
// Validates username
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

// GET /api/users/all - Get all users
router.get('/all', getAll);

// GET /api/users/:id - Get single user
router.get('/:id', getUserById);

// DELETE /api/users/:id - Delete user
router.delete('/:id', remove);

// Friend management routes
router
	.route('/:userId/friends/:friendId')
	.post(addFriend) // Add friend
	.delete(removeFriend); // Remove friend

module.exports = router;
