const User = require('../Model/user.model');
const bcrypt = require('bcrypt');

exports.createAUserService = async (user) => {
	const result = await User.create(user);
	return result;
};

exports.loginAUserService = async (email) => {
	const result = await User.findOne({ email });
	return result;
};

exports.userPersistenceService = async (email) => {
	return await User.findOne({ email });
};
exports.confirmEmailService = async (token) => {
	return await User.findOne({ confirmationToken: token });
};

exports.updateProfileService = async (data, email) => {
	const findUser = await User.updateOne(
		{ email },
		{ $set: data },
		{ upsert: true }
	);
	return findUser;
};

exports.changePasswordService = async (oldPassword, newPassword, email) => {
	const findUser = await User.findOne({ email });
	const isPasswordCorract = bcrypt.compareSync(oldPassword, findUser.password);

	if (isPasswordCorract) {
		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);

		const hashPassword = bcrypt.hashSync(newPassword, salt);

		const result = await User.updateOne(
			{ email },
			{ $set: { password: hashPassword } },
			{ upsert: true }
		);
	}
	// return findUser;
};
