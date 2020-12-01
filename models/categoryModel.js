/** @format */

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	_id: {
		type: Number,
	},
	name: {
		type: String,
	},
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
