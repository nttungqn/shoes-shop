const express = require('express')
const brandController = require('./../controllers/brandController')

const route = express.Router();

route.get('/', brandController.getAllV2);

module.exports = route;