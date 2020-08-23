/** @format */
const catchAsync = require('./../utils/catchAsync');

module.exports.getAll = (Model) =>
	catchAsync(async (req, res, next) => {
		try {
			const docs = await Model.find({});
			res.status(200).json({
				status: 'success',
				data: {
					length: docs.length,
					docs,
				},
			});
		} catch (err) {
			res.status(404).json({
				status: 'error',
				message: err,
			});
		}
	});

module.exports.createOne = (Model) =>
	catchAsync(async (req, res, next) => {
		try {
			const doc = await Model.create(req.body);
			res.status(201).json({
				status: 'success',
				data: {
					doc,
				},
			});
		} catch (err) {
			res.status(404).json({
				status: 'error',
				message: err,
			});
		}
	});

module.exports.getOne = (Model) =>
	catchAsync(async (req, res, next) => {
		try {
			const doc = await Model.findById({ _id: req.params.id });

			if (!doc) {
				res.status(204).json({
					status: 'error',
					data: {
						status: 'fail',
						message: `No document with that id = ${req.params.id}`,
					},
				});
			} else {
				res.status(200).json({
					status: 'success',
					data: {
						doc,
					},
				});
			}
		} catch (err) {
			res.status(404).json({
				status: 'error',
				message: err,
			});
		}
	});

module.exports.updateOne = (Model) =>
	catchAsync(async (req, res, next) => {
		try {
			const doc = await Model.findByIdAndUpdate(req.params.id, req.body);

			if (!doc) {
				res.status(204).json({
					status: 'error',
					data: {
						status: 'fail',
						message: `No document with that id = ${req.params.id}`,
					},
				});
			} else {
				res.status(200).json({
					status: 'success',
					data: {
						doc,
					},
				});
			}
		} catch (err) {
			res.status(404).json({
				status: 'error',
				message: err,
			});
		}
	});

module.exports.deleteOne = (Model) =>
	catchAsync(async (req, res, next) => {
		try {
			const doc = await Model.findOneAndDelete(req.params.id, req.body);

			if (!doc) {
				res.status(204).json({
					status: 'error',
					data: {
						status: 'fail',
						message: `No document with that id = ${req.params.id}`,
					},
				});
			} else {
				res.status(200).json({
					status: 'success',
					data: {
						doc,
					},
				});
			}
		} catch (err) {
			res.status(404).json({
				status: 'error',
				message: err,
			});
		}
	});
