const Brand = require('../models/brandModel');

module.exports.getAll = (query) => {
	return new Promise((resolve, reject) => {
		Brand.find(options)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};
