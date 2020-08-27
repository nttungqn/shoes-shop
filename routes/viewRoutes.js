/** @format */
const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);

router.get('/category', viewController.getShopCategory);

router.get('/products/:slug', viewController.getDetailProduct);

router.get('/login', viewController.getLoginForm);

router.get('/forgot-password', viewController.getForgotPasswordForm);

router.get('/register', viewController.getRegisterForm);

module.exports = router;
