const AddToCart = require('../Model/addToCart.model');

exports.addToCartCreateService = async (item) => {
	const result = await AddToCart.create(item);
	return result;
};
exports.addToCartFindService = async (id, email) => {
	const findByEmail = await AddToCart.find({ email });
	// console.log(findByEmail);

	const result = findByEmail?.find((product) => product.id === id);

	return result;
};
exports.addToCartFindByEmailService = async (email) => {
	const result = await AddToCart.find({ email });
	const count = await AddToCart.find({ email }).count();
	return { result, count };
};

exports.removeAddToCartService = async (id) => {
	const result = await AddToCart.deleteOne({ _id: id });
	return result;
};

exports.incressAddToCartService = async (id, price) => {
	const update = await AddToCart.updateOne(
		{ _id: id },
		{ $inc: { orderQuantity: 1 } }
	);
	const updatePrice = await AddToCart.findByIdAndUpdate(
		{ _id: id },
		{ totalPrice: price }
	);
};
exports.decressAddToCartService = async (id, price) => {
	const update = await AddToCart.updateOne(
		{ _id: id },
		{ $inc: { orderQuantity: -1 } }
	);
	const updatePrice = await AddToCart.findByIdAndUpdate(
		{ _id: id },
		{ totalPrice: price }
	);
};
