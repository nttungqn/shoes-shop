/** @format */

const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'A shoes must have a name'],
			unique: true,
			maxlength: [50, 'A shoes name must have less or equal than 50 characters'],
			minlength: [3, 'A shoes name must have more or equal than 6 characters'],
		},
		slug: String,
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
		size: {
			type: [String],
			required: true,
		},
		price: {
			type: Number,
			required: [true, 'A shoes must have a price'],
		},
		description: [String],
		imageCover: {
			type: String,
			required: [true, 'A shoes must have a image cover'],
		},
		brand: {
			type: String,
			default: 'Nike',
		},
		images: [String],
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

productSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
