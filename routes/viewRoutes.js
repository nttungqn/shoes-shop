/** @format */
const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);

router.get('/category', viewController.getShopCategory);

router.get('/products/:slug', viewController.getDetailProduct);

module.exports = router;
