const Store = require('../Model/store.model');

exports.getStoreByLocationService = async (query) => {
	const { location, skip, limit } = query;

	const result = await Store.Store.find({ location: location })
		.skip(skip)
		.limit(limit)
		.sort('-name')
		.populate('product');
	const count = await Store.Store.find({}).count();
	const paiganation = Math.ceil(count / limit);
	return { result, paiganation };
};

exports.createStoreService = async (data) => {
	const result = await Store.Store.create(data);
	return result;
};

exports.getSingleStoreByIdService = async (id) => {
	const result = await Store.Store.findById(id).populate('product');
	return result;
};
