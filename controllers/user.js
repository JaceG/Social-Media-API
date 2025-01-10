// imports
const User = require('../models/user');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

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

		const deletedUser = await User.findByIdAndDelete(id);

		if (!deletedUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json({ message: 'User deleted successfully!' });
	} catch (error) {
		let status = 500;

		if (error.statusCode) {
			status = error.statusCode;
		}
		res.status(status).json({ message: 'Unable to delete user!', error });
	}
}

async function getAll(req, res) {
	try {
		const users = await User.find();
		res.json({ message: 'User listed successfully!', users });
	} catch (error) {
		let status = 500;

		if (error.statusCode) {
			status = error.statusCode;
		}
		res.status(status).json({ message: 'Unable to delete user!', error });
	}
}

module.exports = {
	create,
	update,
	remove,
	getAll,
};
