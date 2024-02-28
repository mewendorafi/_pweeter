const { authService } = require('../services');

module.exports = async (req, _, next) => {
	const { authorization } = req.headers;
	if (!authorization) throw new Error(401);
	const token = authorization.split(' ')[1]; // remove "Bearer" from input string
	const isAuth = await authService.authenticate(token);
	if (!isAuth) throw new Error(401);
	return next();
};
