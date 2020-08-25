/** @format */
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

// 1) Get tour data from collection
// 2) Build template
// 3) Render that template using tour data from 1)

module.exports.getOverview = catchAsync(async (req, res, next) => {
	res.status(200).render('index', {
		title: 'Overview',
	});
});

module.exports.getShopCategory = catchAsync(async (req, res, next) => {
	res.status(200).render('category', {
		title: 'Shop Category',
	});
});

module.exports.getDetailProduct = catchAsync(async (req, res, next) => {
	res.status(200).render('single-product', {
		title: 'Detail Product',
	});
});