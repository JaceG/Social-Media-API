const Thought = require('../models/thought');
const User = require('../models/user');
const mongoose = require('mongoose');

// Helper function to validate MongoDB ObjectIds
function isValidObjectId(id) {
	return mongoose.Types.ObjectId.isValid(id);
}

// Get all thoughts
async function getAllThoughts(req, res) {
	try {
		const thoughts = await Thought.find();
		res.json(thoughts);
	} catch (err) {
		res.status(500).json(err);
	}
}

// Get single thought by ID
async function getThoughtById(req, res) {
	try {
		const { id } = req.params;
		if (!isValidObjectId(id)) {
			return res
				.status(400)
				.json({ message: 'Invalid thought ID format' });
		}

		const thought = await Thought.findById(id);
		if (!thought) {
			return res
				.status(404)
				.json({ message: 'No thought found with this id!' });
		}
		res.json(thought);
	} catch (err) {
		res.status(500).json(err);
	}
}

// Create new thought and add to user's thoughts array
async function createThought(req, res) {
	try {
		const thought = await Thought.create(req.body);
		// Add thought reference to user's thoughts array
		await User.findByIdAndUpdate(req.body.userId, {
			$push: { thoughts: thought._id },
		});
		res.json(thought);
	} catch (err) {
		res.status(500).json(err);
	}
}

// Delete thought and remove from user's thoughts array
async function deleteThought(req, res) {
	try {
		const { id } = req.params;
		if (!isValidObjectId(id)) {
			return res
				.status(400)
				.json({ message: 'Invalid thought ID format' });
		}

		const thought = await Thought.findByIdAndDelete(id);
		if (!thought) {
			return res
				.status(404)
				.json({ message: 'No thought found with this id!' });
		}

		// Remove thought reference from user's thoughts array
		await User.findByIdAndUpdate(thought.userId, {
			$pull: { thoughts: thought._id },
		});

		res.json({ message: 'Thought deleted!' });
	} catch (err) {
		res.status(500).json(err);
	}
}

// Add reaction to thought
async function addReaction(req, res) {
	try {
		const thought = await Thought.findByIdAndUpdate(
			req.params.thoughtId,
			{ $push: { reactions: req.body } },
			{ new: true }
		);
		if (!thought) {
			return res
				.status(404)
				.json({ message: 'No thought found with this id!' });
		}
		res.json(thought);
	} catch (err) {
		res.status(500).json(err);
	}
}

// Remove reaction from thought
async function removeReaction(req, res) {
	try {
		const thought = await Thought.findByIdAndUpdate(
			req.params.thoughtId,
			{ $pull: { reactions: { reactionId: req.params.reactionId } } },
			{ new: true }
		);
		if (!thought) {
			return res
				.status(404)
				.json({ message: 'No thought found with this id!' });
		}
		res.json(thought);
	} catch (err) {
		res.status(500).json(err);
	}
}

// Update thought by ID
async function updateThought(req, res) {
	try {
		const { id } = req.params;
		if (!isValidObjectId(id)) {
			return res
				.status(400)
				.json({ message: 'Invalid thought ID format' });
		}

		const thought = await Thought.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!thought) {
			return res
				.status(404)
				.json({ message: 'No thought found with this id!' });
		}

		res.json(thought);
	} catch (err) {
		res.status(500).json(err);
	}
}

module.exports = {
	getAllThoughts,
	getThoughtById,
	createThought,
	updateThought,
	deleteThought,
	addReaction,
	removeReaction,
};
