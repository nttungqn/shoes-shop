/** @format */
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const Product = require('./../models/productModel');

// 1) Get tour data from collection
// 2) Build template
// 3) Render that template using tour data from 1)

module.exports.getOverview = catchAsync(async (req, res, next) => {
	const products = await Product.find().limit(8);
	res.status(200).render('index', {
		title: 'Overview',
		products,
	});
});

module.exports.getShopCategory = catchAsync(async (req, res, next) => {
	let { page, sortBy, orderBy } = req.query;
	page = page !== undefined ? parseInt(page) : 1;
	let sort;
	if (sortBy === 'name') sort = 'name';
	else if (sortBy === 'price') sort = { price: orderBy };

	let limit = parseInt(req.query.limit || process.env.ITEMS_ON_PAGE);
	let skip = (parseInt(req.query.page || 1) - 1) * limit;

	const products =
		sort !== undefined
			? await Product.find().sort(sort).limit(limit).skip(skip)
			: await Product.find().limit(limit).skip(skip);
	const allProducts = await Product.find();
	let lastPage = Math.ceil(allProducts.length / limit);

	res.status(200).render('shop', {
		title: 'Shop Category',
		products,
		numberItems: limit,
		lastPage,
		currentPage: page,
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

module.exports.getLoginForm = catchAsync(async (req, res, next) => {
	res.status(200).render('login', {
		title: 'Login',
	});
});

module.exports.getRegisterForm = catchAsync(async (req, res, next) => {
	res.status(200).render('register', {
		title: 'Register',
	});
});

module.exports.getForgotPasswordForm = catchAsync(async (req, res, next) => {
	res.status(200).render('forgot-password', {
		title: 'Forgot Password',
	});
});
