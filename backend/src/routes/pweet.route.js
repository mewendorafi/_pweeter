const { Router } = require('express');
const router = Router();
const { pweetController } = require('../controllers');
const { pweetValidation } = require('../middlewares/validations');
const {
	authMiddleware,
	validationMiddleware: validate,
} = require('../middlewares');

router
	.route('/')
	.post(
		authMiddleware,
		validate(pweetValidation.create),
		pweetController.create
	)
	.get(authMiddleware, pweetController.queryAll)
	.delete(
		authMiddleware,
		validate(pweetValidation.update),
		pweetController.remove
	)
	.patch(
		authMiddleware,
		validate(pweetValidation.update),
		pweetController.updateLikes
	);

router.get('/trends', authMiddleware, pweetController.queryTrends);

router.get(
	'/:hashtag',
	authMiddleware,
	validate(pweetValidation.queryHashtag),
	pweetController.queryByHashtag
);

module.exports = router;
