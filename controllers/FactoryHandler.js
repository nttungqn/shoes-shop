/** @format */

module.exports.getAll = (Model) => async (req, res, next) => {
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

	next();
};

module.exports.createOne = (Model) => async (req, res, next) => {
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

	next();
};

module.exports.getOne = (Model) => async (req, res, next) => {
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
};

module.exports.updateOne = (Model) => async (req, res, next) => {
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
};

module.exports.deleteOne = (Model) => async (req, res, next) => {
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
};
