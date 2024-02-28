// const catchAsync = require('../utils/catchAsync');
// const userService = require('../services/user.service');

// const queryAll = catchAsync(async (_, res) => {
// 	const users = await userService.queryAll();
// 	return res.status(200).send(users);
// });

// const query = catchAsync(async (req, res) => {
// 	const { email } = req.body;
// 	const user = await userService.queryByEmail(email);
// 	if (!user) throw new Error(404);
// 	return res.status(200).send(user);
// });

// module.exports = {
// 	query,
// 	queryAll
// };
