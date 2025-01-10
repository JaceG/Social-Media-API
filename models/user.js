// imports
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
	username: {
		type: String,
		require: true,
		trim: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please fill a valid email address',
		],
	},
	thougths: {
		type: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
		default: [],
	},
	friends: {
		type: [{ type: Schema.Types.ObjectId, ref: 'Friend' }],
		default: [],
	},
});

const User = mongoose.model('user', userSchema);
module.exports = User;
