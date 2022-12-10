const router = require('express').Router();
const storeCollaction = require('../../Collaction/store.collaction');

router
	.route('/storebylocation')
	.get(storeCollaction.getStoreByLocationCollaction);

router.route('/store').post(storeCollaction.createStoreCollaction);
router.route('/store/:id').get(storeCollaction.getSingleStoreByIdCollaction);

module.exports = router;
