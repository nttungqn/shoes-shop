const express = require('express')
const productController = require('./../controllers/productController');
const route = express.Router();

route.get('/',productController.getAll)
route.get('/trending-products', productController.getTrendingProduct)
route.get('/top-products', productController.getTopProducts)
route.get('/:id', productController.getProductById)

module.exports = route;