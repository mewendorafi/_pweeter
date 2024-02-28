const Joi = require('joi');
const { isValidPassword } = require('./custom.validation');

const login = {
	body: Joi.object().keys({
		email: Joi.string().required(),
		password: Joi.string().required(),
	}),
};

const register = {
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		username: Joi.string().min(2).max(42).required(),
		lastname: Joi.string().min(2).max(42).required(),
		firstname: Joi.string().min(2).max(42).required(),
		password: Joi.string().custom(isValidPassword).required(),
	}),
};

module.exports = {
	login,
	register,
};
