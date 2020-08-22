/** @format */

const Shoes = require('./../models/shoesModel');

module.exports.getAllShoes = async (req, res, next) => {
	try {
		const shoes = await Shoes.find({});
		res.status(200).json({
			status: 'success',
			shoes: {
				length: shoes.length,
				shoes,
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
