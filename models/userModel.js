/** @format */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, 'Please tell us your name'],
	},
	email: {
		type: String,
		unique: true,
		require: [true, 'Please provide your mail'],
		lowercase: true,
	},
	password: {
		type: String,
		require: [true, 'Please provide a password'],
	},
	passwordConfirm: {
		type: String,
		require: [true, 'Please provide a password confirm'],
		validate: {
			validator: function (val) {
				return val === this.password;
			},
			message: 'Passwords are not the same',
		},
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
