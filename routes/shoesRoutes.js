/** @format */

const express = require('express');
const shoesController = require('./../controllers/shoesController');
const router = express.Router();

router.get('/', shoesController.getAllShoes);

module.exports = router;
