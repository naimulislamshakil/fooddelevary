const router = require('express').Router();
const productCollaction = require('../../Collaction/product.collaction');
const verifyToken = require('../../Middleware/verifyToken');

router
	.route('/product')
	.post(verifyToken, productCollaction.postAProductCollaction)
	.get(productCollaction.getAllProductCollaction);

router.route('/getSingle/:name').get(productCollaction.getSingleStore);

module.exports = router;
