const verifyToken = require('../../Middleware/verifyToken');
const Collaction = require('../../Collaction/payment.collaction');

const router = require('express').Router();

router.route('/get/payment').get(verifyToken, Collaction.getPaymentCollaction);
router.route('/payment').post(verifyToken, Collaction.paymentCollaction);

module.exports = router;
