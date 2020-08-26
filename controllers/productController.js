/** @format */

const Product = require('./../models/productModel');
const factoryHandler = require('./FactoryHandler');

module.exports.getAllProduct = factoryHandler.getAll(Product);

module.exports.createProduct = factoryHandler.createOne(Product);

module.exports.getProduct = factoryHandler.getOne(Product);

module.exports.updateProduct = factoryHandler.updateOne(Product);

module.exports.deleteProduct = factoryHandler.deleteOne(Product);
