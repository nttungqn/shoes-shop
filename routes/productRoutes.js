const express = require('express')
const productController = require('./../controllers/productController');
const route = express.Router();

route.get('/',productController.getAll)
route.get('/:id', productController.getProductById)
route.get('/trending-product', productController.getTrendingProduct)
route.get('/top-products', productController.getTopProducts)

module.exports = route;