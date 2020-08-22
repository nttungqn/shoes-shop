/** @format */

const User = require('./../models/userModel');

module.exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({});
		res.status(200).json({
			status: 'success',
			users: {
				length: users.length,
				users,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'error',
			message: err,
		});
	}

	next();
};
