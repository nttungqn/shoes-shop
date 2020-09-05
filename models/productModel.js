/** @format */

const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
	{
		_id: {
			type: Number,
		},
		name: {
			type: String,
			trim: true,
			text: true,
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
		description: {
			type: String,
		},
		summary: { type: String },
		imageCover: {
			type: String,
			required: [true, 'A shoes must have a image cover'],
		},
		brand: {
			type: Number,
			ref: 'Brand',
			required: [true, 'Product must belong to a brand'],
		},
		category: {
			type: Number,
			ref: 'Category',
			required: [true, 'Product must belong to a category'],
		},
		color: [
			{
				type: Number,
				ref: 'Category',
				required: [true],
			},
		],
		images: [String],
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

productSchema.index({ name: 'text' });
// productSchema.index({ '$**': 'text' });

productSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

productSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'brand',
		select: 'name',
	});

	this.populate({
		path: 'category:',
		select: 'name',
	});

	this.populate({
		path: 'color',
		select: 'name',
	});

	next();
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
