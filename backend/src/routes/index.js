const { Router } = require('express');
const router = Router();
const authRouter = require('./auth.route.js');
const userRouter = require('./user.route.js');
const pweetRouter = require('./pweet.route.js');

// Index View
router.get('/', async (req, res) => {
	res.status(200).send(`
	  <!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title> Node Server </title>
			</head>
			<body style='height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: antiquewhite;'>
				<h1> Pweeter Server </h1>
			</body>
		</html>
	`);
});

const DEFAULT_ROUTES = [
	{
		segment: '/auth',
		router: authRouter,
	},
	{
		segment: '/pweet',
		router: pweetRouter,
	},
	{
		segment: '/user',
		router: userRouter,
	},
	// extend ...
];

DEFAULT_ROUTES.forEach(path => {
	router.use(path.segment, path.router);
});

module.exports = router;
