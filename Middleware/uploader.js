const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: 'images/',
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + '-' + file.originalname);
	},
});

const uploader = multer({
	storage,
	fileFilter: (req, file, cb) => {
		const supported = /png|jpg/;
		const extension = path.extname(file.originalname);

		if (supported.test(extension)) {
			cb(null, true);
		} else {
			cb(new Error('Must be a jpg/png image.'));
		}
	},
	limits: {
		fileSize: 5000000,
	},
});

module.exports = uploader;
