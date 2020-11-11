const Brand = require('../models/brandModel');
const { HTTPStatusCode, MESSAGE } = require('../utils/base');
const catchAsync = require('../utils/catchAsync');

module.exports.getAll = (query) => {
	return new Promise((resolve, reject) => {
		let options = {};

		Brand.find(options)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};

module.exports.getAllV2 = catchAsync(async(req, res) => {
	const records = await Brand.find();
	
	if(records){
		res.status(HTTPStatusCode.OK).json({result: records})
	}
	res.status(HTTPStatusCode.NOT_FOUND).json({message: MESSAGE.RECORD_DOES_NOT_EXIST})
})
