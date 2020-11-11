const Category = require('../models/categoryModel');

module.exports.getAll = (query) => {
	return new Promise((resolve, reject) => {
		let options = {};

		if (query) {
		}
		Category.find(options)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};
