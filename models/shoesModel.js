/** @format */

const mongoose = require('mongoose');

const shoesSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'A shoes must have a name'],
		unique: true,
		maxlength: [40, 'A shoes name must have less or equal than 40 characters'],
		minlength: [3, 'A shoes name must have more or equal than 6 characters'],
	},
	ratingsAverage: {
		type: Number,
		default: 4.5,
		min: [1, 'Rating must be above 1.0'],
		max: [5, 'Rating must be below 5.0'],
		set: (val) => Math.round(val * 10) / 10, // 4.6667, 47, 4.7
	},
	ratingsQuantity: {
		type: Number,
		default: 0,
	},
	price: {
		type: Number,
		required: [true, 'A shoes must have a price'],
	},
	priceDiscount: {
		type: Number,
		validate: {
			validator: function (val) {
				// this only points to current doc on NEW document creation
				return val < this.price;
			},
			message: 'Dicount price ({VALUE}) should be blow regular price)',
		},
	},
	description: {
		type: String,
		trim: true,
	},
	// imageCover: {
	//     type: String,
	//     required: [true, 'A shoes must have a image cover'],
	// },
	// images: [String],
});

const Shoes = mongoose.model('Shoes', shoesSchema);

module.exports = Shoes;
