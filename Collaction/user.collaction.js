const userService = require('../Service/user.service');
const bcrypt = require('bcrypt');
const { generateToken } = require('../Utils/jwtToken');

exports.createAUserCollaction = async (req, res) => {
	try {
		const result = await userService.createAUserService(req.body);

		res.status(200).json({
			status: 'Success',
			message: 'User create Successfully.',
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};

exports.loginUserCollaction = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userService.loginAUserService(email);

		if (!user) {
			return res.status(401).json({
				status: 'Fail',
				message: 'User not found. Please create a user.',
			});
		}

		const isPasswordCorract = bcrypt.compareSync(password, user.password);

		if (!isPasswordCorract) {
			return res.status(403).json({
				status: 'Fail',
				message: 'Password is not correct.',
			});
		}

		if (user.status != 'Active') {
			return res.status(401).json({
				status: 'Fail',
				message: 'Your account is not active yet.',
			});
		}

		const token = generateToken(user);

		const { password: pwd, ...other } = user.toObject();

		res.status(200).json({
			status: 'Success',
			message: 'Successfully logged in.',
			data: {
				user: other,
				token,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};

exports.userPersistence = async (req, res) => {
	try {
		const user = await userService.userPersistenceService(req.user?.email);
		const { password: psd, ...other } = user.toObject();
		res.status(200).json({
			status: 'Success',
			message: 'User Is Valid.',
			user: other,
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};
exports.confirmEmail = async (req, res) => {
	try {
		const { token } = req.params;
		const user = await userService.confirmEmailService(token);

		if (!user) {
			return res.status(403).json({
				status: 'Faild',
				message: 'Invalid token.',
			});
		}

		const expire = new Date() > new Date(user.confirmationTokenExpire);

		if (expire) {
			return res.status(401).json({
				status: 'Faild',
				message: 'Your link has been expire.',
			});
		}

		user.status = 'Active';
		user.confirmationToken = undefined;
		user.confirmationTokenExpire = undefined;
		await user.save({ validateBeforeSave: false });

		res.status(200).json({
			status: 'Success',
			message: 'User Is Valid.',
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};

exports.saveImage = async (req, res) => {
	try {
		res.status(200).json(req.file.filename);
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};

exports.updateProfileCollaction = async (req, res) => {
	try {
		const { email } = req.user;
		const { lastName, contactNumber, firstName, store, location, place } =
			req.body;
		const data = { lastName, contactNumber, firstName, store, location, place };

		const result = await userService.updateProfileService(data, email);
		// console.log(data);

		res.status(200).json({
			status: 'Success',
			message: 'Your Account Update Successfully.',
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};

exports.changePasswordCollaction = async (req, res) => {
	try {
		const { email } = req.user;
		const { oldPassword, newPassword } = req.body;

		const result = await userService.changePasswordService(
			oldPassword,
			newPassword,
			email
		);

		res.status(200).json({
			status: 'Success',
			message: 'Your Password Update Successfully.',
		});
	} catch (error) {
		res.status(500).json({
			status: 'Faild',
			error: error.message,
		});
	}
};
