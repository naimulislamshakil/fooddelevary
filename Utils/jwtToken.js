const jwt = require('jsonwebtoken');

exports.generateToken = (userInfo) => {
	const payload = {
		email: userInfo.email,
		role: userInfo.role,
	};

	// token
	const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
		expiresIn: '1d',
	});
	return token;
};
