/** @format */
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

module.exports.getAll = (Model) =>
	catchAsync(async (req, res, next) => {
		const docs = await Model.find({});
		res.status(200).json({
			status: 'success',
			data: {
				length: docs.length,
				docs,
			},
		});
	});

module.exports.createOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				doc,
			},
		});
	});

module.exports.getOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findById({ _id: req.params.id });

		if (!doc) {
			return next(new AppError('Not document found with that ID', 404));
		}

		res.status(200).json({
			status: 'success',
			data: {
				doc,
			},
		});
	});

module.exports.updateOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndUpdate(req.params.id, req.body);

		if (!doc) {
			return next(new AppError('Not document found with that ID', 404));
		}
		res.status(200).json({
			status: 'success',
			data: {
				doc,
			},
		});
	});

module.exports.deleteOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findOneAndDelete(req.params.id, req.body);

		if (!doc) {
			return next(new AppError('Not document found with that ID', 404));
		}

		res.status(200).json({
			status: 'success',
			data: {
				doc,
			},
		});
	});
