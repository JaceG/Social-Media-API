// imports
const User = require('../models/user');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Thought = require('../models/thought');

// Helper function to validate MongoDB ObjectIds
function isValidObjectId(id) {
	return mongoose.Types.ObjectId.isValid(id);
}

async function create(req, res) {
	try {
		// Simulated user input (replace with req.body data)
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const error = new Error('Validation failed.');
			error.statusCode = 422;
			error.data = errors.array();
			throw error;
		}

		const { username, email } = req.body;
		const user = await User.findOne({ email });

		if (user) {
			return res
				.status(400)
				.json({ error: 'Email already used, try again!' });
		}

		const uniqueUser = await User.findOne({ username });

		if (uniqueUser) {
			return res.status(400).json({ error: 'Username taken!' });
		}

		await User.create({
			username,
			email,
		});

		res.json({ message: 'User created successfully!' });
	} catch (error) {
		let status = 500;

		if (error.statusCode) {
			status = error.statusCode;
		}
		console.error('Error registering user:', error);
		res.status(status).json({ message: 'Registration failed!', error });
	}
}

async function update(req, res) {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id)) {
			return res.status(400).json({ message: 'Invalid user ID format' });
		}

		// Simulated user input (replace with req.body data)
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const error = new Error('Validation failed.');
			error.statusCode = 422;
			error.data = errors.array();
			throw error;
		}

		const { username } = req.body;

		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({ error: 'User does not exist!' });
		}

		const uniqueUser = await User.findOne({
			username: { $regex: new RegExp(`^${username}$`, 'i') },
			_id: { $ne: req.params.id },
		});

		if (uniqueUser) {
			return res.status(400).json({ error: 'Username taken!' });
		}

		user.username = username;
		await user.save();

		res.json({ message: 'User updated successfully!' });
	} catch (error) {
		let status = 500;

		if (error.statusCode) {
			status = error.statusCode;
		}
		console.error('Error registering user:', error);
		res.status(status).json({ message: 'User update failed!', error });
	}
}

async function remove(req, res) {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id)) {
			return res.status(400).json({ message: 'Invalid user ID format' });
		}

		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// BONUS: Delete all thoughts by this user
		await Thought.deleteMany({ username: user.username });

		// Delete the user
		await user.deleteOne();

		res.json({
			message: 'User and associated thoughts deleted successfully!',
		});
	} catch (error) {
		let status = error.statusCode || 500;
		res.status(status).json({ message: 'Unable to delete user!', error });
	}
}

async function getAll(req, res) {
	try {
		const users = await User.find()
			.populate('thoughts')
			.populate('friends');
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
}

async function addFriend(req, res) {
	try {
		const { userId, friendId } = req.params;

		if (!isValidObjectId(userId) || !isValidObjectId(friendId)) {
			return res.status(400).json({ message: 'Invalid ID format' });
		}

		if (userId === friendId) {
			return res
				.status(400)
				.json({ message: 'Users cannot be friends with themselves' });
		}

		const user = await User.findById(userId);
		const friend = await User.findById(friendId);

		if (!user || !friend) {
			return res
				.status(404)
				.json({ message: 'User or friend not found' });
		}

		if (user.friends.includes(friendId)) {
			return res.status(400).json({ message: 'Already friends!' });
		}

		user.friends.push(friendId);
		await user.save();

		res.json({ message: 'Friend added successfully!', user });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
}

async function removeFriend(req, res) {
	try {
		const { userId, friendId } = req.params;

		if (!isValidObjectId(userId) || !isValidObjectId(friendId)) {
			return res.status(400).json({ message: 'Invalid ID format' });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (!user.friends.includes(friendId)) {
			return res
				.status(400)
				.json({ message: 'Not friends with this user' });
		}

		user.friends = user.friends.filter((id) => id.toString() !== friendId);
		await user.save();

		res.json({ message: 'Friend removed successfully!', user });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
}

async function getUserById(req, res) {
	try {
		const { id } = req.params;

		// Validate ID format
		if (!isValidObjectId(id)) {
			return res.status(400).json({ message: 'Invalid user ID format' });
		}

		// Find user and populate references
		const user = await User.findById(id)
			.populate('thoughts')
			.populate('friends');

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json(user);
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
}

module.exports = {
	create,
	update,
	remove,
	getAll,
	addFriend,
	removeFriend,
	getUserById,
};
