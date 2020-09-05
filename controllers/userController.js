/** @format */

const User = require('./../models/userModel');
const factoryHandler = require('./FactoryHandler');
const bcrypt = require('bcryptjs');

module.exports.getAllUsers = factoryHandler.getAll(User);

module.exports.createUser = factoryHandler.createOne(User);

// module.exports.getUser = factoryHandler.getOne(User);

module.exports.updateUser = factoryHandler.updateOne(User);

module.exports.deleteUser = factoryHandler.deleteOne(User);

module.exports.getUserByEmail = (email) => {
	return new Promise((resolve, reject) => {
		User.findOne({ email: email })
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};

module.exports.createUser = async (user) => {
	var salt = bcrypt.genSaltSync(10);
	user.password = bcrypt.hashSync(user.password, salt);
	return await User.create(user);
};

module.exports.comparePassword = (password, hash) => {
	return bcrypt.compareSync(password, hash);
};
