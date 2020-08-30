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
	let { page, sortBy, orderBy, brand, size, priceFrom, priceTo } = req.query;
	page = page !== undefined ? parseInt(page) : 1;

	// 0 mean sort defaults
	// 1 mean sort by name order by A -> Z
	// 2 name: Z - > A
	// 3 price: Low to High
	// 4 price: High to Low
	let selectedSort = 0;

	let sort;
	if (sortBy === 'name') {
		sort = { name: orderBy };
		selectedSort = orderBy === 'asc' ? 1 : 2;
	} else if (sortBy === 'price') {
		sort = { price: orderBy };
		selectedSort = orderBy === 'asc' ? 3 : 4;
	}

	let limit = parseInt(req.query.limit || process.env.ITEMS_ON_PAGE);
	let skip = (parseInt(req.query.page || 1) - 1) * limit;

	brand = brand !== undefined ? brand : '';
	size = size !== undefined ? size : 0;
	priceFrom = priceFrom !== undefined ? priceFrom : 0;
	priceTo = priceTo !== undefined ? priceTo : 9999;

	const products = await Product.find({
		brand: new RegExp(brand, 'i'),
		size: new RegExp(size, 'i'),
		price: { $gt: priceFrom, $lt: priceTo },
	})
		.sort(sort)
		.limit(limit)
		.skip(skip);

	const allProducts = await Product.find();
	let lastPage = Math.ceil(allProducts.length / limit);

	res.status(200).render('products', {
		title: 'Shop Category',
		products,
		numberItems: limit,
		lastPage,
		currentPage: page,
		selectedSort,
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
