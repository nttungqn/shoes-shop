/** @format */

const User = require('./../models/userModel');
const factoryHandler = require('./FactoryHandler');

module.exports.getAllUsers = factoryHandler.getAll(User);

module.exports.createUser = factoryHandler.createOne(User);

module.exports.getUser = factoryHandler.getOne(User);

module.exports.updateUser = factoryHandler.updateOne(User);

module.exports.deleteUser = factoryHandler.deleteOne(User);
