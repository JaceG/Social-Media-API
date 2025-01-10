// imports
const User = require('../models/user');
const { validationResult } = require('express-validator');

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

module.exports = {
	create,
};
