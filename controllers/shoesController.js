/** @format */

const Shoes = require('./../controllers/shoesController');

module.exports.getAllShoes = async (req, res, next) => {
	try {
		const shoes = await Shoes.find();
		res.status(200).json({
			shoes: shoes.length,
			message: success,
		});
		console.log(shoes.length);
	} catch (err) {
		res.status(404).json({
			message: fail,
		});
	}

	next();
};
