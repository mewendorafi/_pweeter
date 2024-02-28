const {
	Schema,
	model,
	Types: { ObjectId },
} = require('mongoose');

const pweetSchema = new Schema(
	{
		author: { type: ObjectId, ref: 'users', required: true },
		content: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 280,
		},
		likes: [{ type: ObjectId, ref: 'users', required: true }],
	},
	{ timestamps: true }
);

module.exports = model('pweets', pweetSchema);
