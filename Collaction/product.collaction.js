const productService = require('../Service/product.service');

exports.postAProductCollaction = async (req, res) => {
	try {
		const result = await productService.postAProductService(req.body);
		res.status(200).json({
			status: 'Success',
			message: 'Product create Successfully.',
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};

exports.getAllProductCollaction = async (req, res) => {
	try {
		const result = await productService.getAllProductService();
		res.status(200).json({
			status: 'Success',
			message: 'Get All Product Successfully.',
			result,
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};

exports.getSingleStore = async (req, res) => {
	try {
		const { name } = req.params;
		const result = await productService.getSingleService(name);
		res.send(result);
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};
