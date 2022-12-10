const service = require('../Service/addToCart.service');
const stripe = require('stripe')(process.env.CLIENT_STRIPE_SECRET_kEY);

exports.addToCartCreateCollaction = async (req, res) => {
	try {
		const { id, email } = req.body;

		const exzist = await service.addToCartFindService(id, email);
		console.log(exzist);
		if (exzist === undefined) {
			const result = await service.addToCartCreateService(req.body);
			return res.status(200).json({
				status: 'Success',
				message: 'Item Add Successfully.',
			});
		} else {
			return res.status(200).json({
				status: 'Fail',
				message: 'Item Alrady Added..',
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};

exports.addToCartFindByEmailCollaction = async (req, res) => {
	try {
		const { email } = req.params;

		const result = await service.addToCartFindByEmailService(email);
		res.status(200).json({
			status: 'Success',
			message: 'Succesfully Get Your Cart Product.',
			result,
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};

exports.removeAddToCartCollaction = async (req, res) => {
	try {
		const { id } = req.params;

		const result = await service.removeAddToCartService(id);
		// console.log(result);
		res.status(200).json({
			status: 'Success',
			message: 'Succesfully Delete Your Cart Product.',
			result,
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};

exports.incressAddToCartCollaction = async (req, res) => {
	try {
		const { id } = req.params;
		const { price } = req.query;
		// console.log(price);
		const result = await service.incressAddToCartService(id, price);
		res.status(200).json({
			status: 'Success',
			message: 'Ok',
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};
exports.decressAddToCartCollaction = async (req, res) => {
	try {
		const { id } = req.params;
		const { price } = req.query;
		// console.log(price);
		const result = await service.decressAddToCartService(id, price);
		res.status(200).json({
			status: 'Success',
			message: 'Ok',
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};

exports.createPaymentIntent = async (req, res) => {
	const { total } = req.body;

	const amount = total * 100;

	const paymentIntent = await stripe.paymentIntents.create({
		amount: amount,
		currency: 'usd',
		payment_method_types: ['card'],
	});
	res.status(200).json({
		clientSecrect: paymentIntent.client_secret,
	});
};
