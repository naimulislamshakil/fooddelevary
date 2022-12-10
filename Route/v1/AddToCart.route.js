const router = require('express').Router();
const collaction = require('../../Collaction/addToCat.collaction');
const verifyToken = require('../../Middleware/verifyToken');

router.route('/addToCart').post(collaction.addToCartCreateCollaction);
router
	.route('/create_payment_intent')
	.post(verifyToken, collaction.createPaymentIntent);
router
	.route('/addToCart/incress/:id')
	.get(collaction.incressAddToCartCollaction);
router
	.route('/addToCart/decress/:id')
	.get(collaction.decressAddToCartCollaction);
router
	.route('/removeAddToCart/:id')
	.delete(collaction.removeAddToCartCollaction);
router
	.route('/addToCart/:email')
	.get(collaction.addToCartFindByEmailCollaction);

module.exports = router;
