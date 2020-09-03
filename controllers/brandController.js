/** @format */

const Brand = require('../models/brandModel');

module.exports.getAll = (query) => {
	return new Promise((resolve, reject) => {
		let options = {};

		Brand.find(options)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};
