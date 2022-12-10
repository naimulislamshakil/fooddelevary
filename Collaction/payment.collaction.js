const service = require('../Service/payment.service');

exports.paymentCollaction = async (req, res) => {
	try {
		const data = req.body;
		const { email } = req.user;
		const result = await service.paymentService(data, email);

		const mailData = {
			to: result.email,
			subject: 'Congratulations! Your payment is successfull.',
			text: `Hi ${result.name},
			Congratulations! Your payment is successfull.
			Your Trangation id is: ${result.id}. You total pay $${result.totalPrice},
			Have a great day,
			Naimul Islam.
			`,
		};

		await sendEmailByGmail(mailData);
		return res.status(200).json({
			status: 'Success',
			message: 'Payment Successfully Save.',
		});
	} catch (error) {
		return res.status(500).json({
			status: 'Fail',
			message: 'Payment not Save.',
		});
	}
};

exports.getPaymentCollaction = async (req, res) => {
	try {
		const { email } = req.user;
		const result = await service.getPaymentService(email);
		res.status(200).json({
			status: 'Success',
			message: 'You Have Payment.',
			result,
		});
	} catch (error) {
		return res.status(500).json({
			status: 'Fail',
			message: 'You Have Not Any Payments.',
		});
	}
};
