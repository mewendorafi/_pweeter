const { Router } = require('express');
const router = Router();
const { authController } = require('../controllers');
const { authValidation } = require('../middlewares/validations');
const { validationMiddleware: validate } = require('../middlewares');

router.post('/login', validate(authValidation.login), authController.login);

router.post(
	'/register',
	validate(authValidation.register),
	authController.register
);

module.exports = router;
