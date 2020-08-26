/** @format */
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const Product = require('./../models/productModel');

// 1) Get tour data from collection
// 2) Build template
// 3) Render that template using tour data from 1)

module.exports.getOverview = catchAsync(async (req, res, next) => {
	const products = await Product.find();
	res.status(200).render('index', {
		title: 'Overview',
		products,
	});
});

module.exports.getShopCategory = catchAsync(async (req, res, next) => {
	const products = await Product.find();

	res.status(200).render('category', {
		title: 'Shop Category',
		products,
	});
});

module.exports.getDetailProduct = catchAsync(async (req, res, next) => {
	const product = await Product.findOne({ slug: req.params.slug });

	if (!product) {
		return next(new AppError('Not product found with that ID', 404));
	}

	res.status(200).render('product-detail', {
		title: 'Detail Product',
		product,
	});
});
