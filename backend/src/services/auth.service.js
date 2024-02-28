const { queryByToken, queryByEmail } = require('../services/user.service');

async function login(email, password) {
	const user = await queryByEmail(email);
	if (!user) return 404;

	const isPasswordMatch = await user.isPasswordMatch(password);
	if (!isPasswordMatch) return 401;

	return user;
}

async function authenticate(token) {
	const user = await queryByToken(token);
	if (!user) return 404;
	return user;
}

module.exports = {
	login,
	authenticate,
};
