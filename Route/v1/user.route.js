const router = require('express').Router();
const userCollaction = require('../../Collaction/user.collaction');
const authorization = require('../../Middleware/authorization');
const uploader = require('../../Middleware/uploader');
const verifyToken = require('../../Middleware/verifyToken');

router
	.route('/photo')
	.post(uploader.single('images'), userCollaction.saveImage);
router
	.route('/user/update')
	.put(verifyToken, userCollaction.updateProfileCollaction);
router
	.route('/user/changePassword')
	.put(verifyToken, userCollaction.changePasswordCollaction);
router.route('/user').post(userCollaction.createAUserCollaction);
router.route('/user/confirmation/:token').get(userCollaction.confirmEmail);
router.route('/login').post(userCollaction.loginUserCollaction);
router.get('/user/persistence', verifyToken, userCollaction.userPersistence);

module.exports = router;
