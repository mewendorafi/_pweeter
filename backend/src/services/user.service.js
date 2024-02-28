const uid2 = require('uid2');
const { UserModel: User } = require('../database/models');

async function queryById(uid) {
	return await User.findById(uid);
}

async function queryByEmail(email) {
	return await User.findOne({ email });
}

async function queryByToken(token) {
	return await User.findOne({ token });
}

async function create(body) {
	const isEmailTaken = await User.isEmailTaken(body.email);
	if (isEmailTaken)
		return { success: false, code: 400, error: 'Email already taken' };
	return User.create({ ...body, token: uid2(64) });
}

module.exports = {
	create,
	queryById,
	queryByEmail,
	queryByToken,
};
