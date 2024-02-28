const Joi = require('joi');
const { isObjectId } = require('./custom.validation');

const pweetSchema = Joi.object({
	author: Joi.string().custom(isObjectId).required(),
	content: Joi.string().min(2).max(280).required(),
	likes: Joi.array()
		.items(Joi.string().custom(isObjectId).required())
		.optional(),
});

const create = {
	body: Joi.object().keys({
		content: Joi.string().min(2).max(280).required(),
	}),
};

const update = {
	body: Joi.object().keys({
		pweet_id: Joi.string().custom(isObjectId).required(),
	}),
};

const queryHashtag = {
	params: Joi.object().keys({
		hashtag: Joi.string().min(2).required(),
	}),
};

module.exports = {
	create,
	update,
	queryHashtag,
	pweetSchema,
};
