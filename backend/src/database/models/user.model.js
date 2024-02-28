const bcrypt = require('bcrypt');
const validator = require('validator');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
		username: {
			trim: true,
			type: String,
			required: true,
		},
		firstname: {
			trim: true,
			type: String,
			required: true,
		},
		lastname: {
			trim: true,
			type: String,
			required: true,
		},
		email: {
			trim: true,
			type: String,
			unique: true,
			required: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Invalid email');
				}
			},
		},
		password: {
			trim: true,
			type: String,
			minLength: 12,
			private: true,
			required: true,
			validate(value) {
				if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
					throw new Error(
						'Password must contain at least one letter and one number'
					);
				}
			},
		},
		token: {
			trim: true,
			type: String,
			minlength: 16,
		},
	},
	{ timestamps: true } // mongoose option to auto-assign "createdAt" and "updatedAt" fields on document
);

// pre-save function to be executed before every user save
userSchema.pre('save', async function (next) {
	if (this.isModified('password'))
		this.password = await bcrypt.hash(this.password, 12);
	return next();
});

// statics are for actions pertaining to multiple docs
userSchema.statics.isEmailTaken = async function (email, uid) {
	const user = await this.findOne({ email, _id: { $ne: uid } }); // $ne === not equal (to exclude the current user id from the query)
	return !!user; // convert returned value to boolean
};

// methods are for actions pertaining to a single doc
userSchema.methods.isPasswordMatch = async function (password) {
	return bcrypt.compare(password, this.password);
};

module.exports = model('users', userSchema);
