/** @format */

const express = require('express');
const productController = require('./../controllers/productController');

const router = express.Router();

router.get('/', (req, res) => {
	var cart = req.session.cart;
	res.locals.cart = cart.getCart();
	res.render('cart');
});

router.post('/', (req, res, next) => {
	var productId = req.body.id;
	var quantity = isNaN(req.body.quantity) ? 1 : req.body.quantity;
	productController
		.getProductById(productId)
		.then((product) => {
			var cartItem = req.session.cart.add(product, productId, quantity);
			res.json(cartItem);
		})
		.catch((err) => next(err));
});

module.exports = router;
