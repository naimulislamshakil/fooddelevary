const mongoose = require('mongoose');

const paymentSchma = mongoose.Schema(
	{
		address: String,
		address2: String,
		country: String,
		email: String,
		id: String,
		name: String,
		phone: String,
		state: String,
		totalPrice: String,
		zip: String,
	},
	{ timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchma);

module.exports = Payment;
