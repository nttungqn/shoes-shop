/** @format */

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const validator = require('validator');

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
		validate: [validator.isEmail, 'Please provide a valid email'],
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
});

userSchema.pre('save', async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified('password')) return next();

	// Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 12);

	// Delete passwordConfirm field
	this.passwordConfirm = undefined;
	next();
});

userSchema.pre('save', function (next) {
	if (!this.isModified('password') || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
