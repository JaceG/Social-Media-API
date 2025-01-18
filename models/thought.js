const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Reaction Schema (subdocument schema)
const reactionSchema = new Schema(
	{
		// Unique identifier for each reaction
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new mongoose.Types.ObjectId(),
		},
		// Content of the reaction, limited to 280 characters
		reactionBody: {
			type: String,
			required: true,
			maxLength: 280,
		},
		// User who created the reaction
		username: {
			type: String,
			required: true,
		},
		// Timestamp with getter for formatting
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
	},
	{
		toJSON: {
			getters: true,
		},
		id: false,
	}
);

// Main Thought Schema
const thoughtSchema = new Schema(
	{
		// Content of the thought, between 1-280 characters
		thoughtText: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 280,
		},
		// Timestamp with formatting
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
		// User who created the thought
		username: {
			type: String,
			required: true,
		},
		// Array of nested reaction documents
		reactions: [reactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

// Helper function to format timestamps
function dateFormat(timestamp) {
	return new Date(timestamp).toLocaleString();
}

// Virtual to count reactions
thoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;
