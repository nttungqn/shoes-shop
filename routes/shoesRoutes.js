/** @format */

const express = require('express');
const shoesController = require('./../controllers/shoesController');

const router = express.Router();

router.route('/').get(shoesController.getAllShoes).post(shoesController.createShoes);
router
	.route('/:id')
	.get(shoesController.getShoes)
	.patch(shoesController.updateShoes)
	.delete(shoesController.deleteShoes);

module.exports = router;
