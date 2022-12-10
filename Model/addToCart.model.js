const mongoose = require('mongoose');

const addToCartSchma = mongoose.Schema(
	{
		category: String,
		email: String,
		description: String,
		img: String,
		name: String,
		price: Number,
		orderQuantity: {
			type: Number,
			default: 1,
		},
		totalPrice: Number,
		quantity: Number,
		status: String,
		store: { id: String },
		unit: String,
		order: Number,
		id: String,
	},
	{
		timestamps: true,
	}
);

const AddToCart = mongoose.model('AddToCart', addToCartSchma);

module.exports = AddToCart;
