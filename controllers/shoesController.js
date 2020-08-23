/** @format */

const Shoes = require('./../models/shoesModel');
const factoryHandler = require('./../controllers/FactoryHandler');

module.exports.getAllShoes = factoryHandler.getAll(Shoes);

module.exports.createShoes = factoryHandler.createOne(Shoes);

module.exports.getShoes = factoryHandler.getOne(Shoes);

module.exports.updateShoes = factoryHandler.updateOne(Shoes);

module.exports.deleteShoes = factoryHandler.deleteOne(Shoes);
