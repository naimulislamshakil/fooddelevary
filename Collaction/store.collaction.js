const storeService = require('../Service/store.service');

exports.getStoreByLocationCollaction = async (req, res) => {
	try {
		const { location, page, limit = 10 } = req.query;
		const query = {};

		if (location) {
			query.location = location;
		}

		if (page || limit) {
			const skip = parseInt(page) * parseInt(limit);
			query.skip = skip;
			query.limit = limit;
		}

		const result = await storeService.getStoreByLocationService(query);
		res.status(200).json({
			status: 'Success',
			message: 'Store Get Successfully.',
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};

exports.createStoreCollaction = async (req, res) => {
	try {
		const result = await storeService.createStoreService(req.body);
		res.status(200).json({
			status: 'Success',
			message: 'Store create Successfully.',
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};

exports.getSingleStoreByIdCollaction = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await storeService.getSingleStoreByIdService(id);
		res.status(200).json({
			status: 'Success',
			message: 'Get store successfully.',
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};
