// imports
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Define the User Schema with required fields and validation
const userSchema = new Schema(
	{
		// Username field - must be unique and trimmed
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		// Email field - must match email regex pattern
		email: {
			type: String,
			required: true,
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please enter a valid email address',
			],
		},
		// Array of thought references - links to Thought model
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Thought',
			},
		],
		// Self-referential array of friend references
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		// Enable virtuals when converting to JSON
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// Virtual property to get friend count
userSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

const User = mongoose.model('User', userSchema);
module.exports = User;
