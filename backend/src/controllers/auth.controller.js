const catchAsync = require('../utils/catchAsync');
const { authService, userService } = require('../services');

const login = catchAsync(async (req, res) => {
	const { email, password } = req.body;
	const queryResult = await authService.login(email, password);
	if (queryResult === 401)
		return res.status(401).send({ code: 401, message: 'Invalid credentials' });
	if (queryResult === 404)
		return res
			.status(404)
			.send({ code: 404, message: 'No user found for this email' });
	return res.status(200).send(queryResult);
});

const register = catchAsync(async (req, res) => {
	console.log('fuck')
	const queryResult = await userService.create(req.body);
	if (queryResult instanceof Error)
		return res.status(500).send({ code: 500, message: 'Invalid email' });
	if (queryResult === 400)
		return res.status(400).send({ code: 400, message: 'Email already taken' });
	return res.status(201).send(queryResult);
});

module.exports = {
	login,
	register,
};
