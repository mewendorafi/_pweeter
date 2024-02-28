const catchAsync = require('../utils/catchAsync');
const pweetService = require('../services/pweet.service');
const extractTokenHeader = require('../utils/extractTokenHeader');

const DB_ERROR = {
	code: 500,
	message: 'Internal Server Error (database query failed)',
};

const handle404 = error => ({
	code: 404,
	message: `No ${error === 'No user found' ? 'user' : 'pweet'} found`,
});

const queryAll = catchAsync(async (_, res) => {
	const pweets = await pweetService.queryAll();
	return res.status(200).send(pweets);
});

const queryByHashtag = catchAsync(async (req, res) => {
	const pweet = await pweetService.queryByHashtag(req.params.hashtag);
	return res.status(200).send(pweet);
});

const queryTrends = catchAsync(async (_, res) => {
	const trends = await pweetService.queryTrends();
	return res.status(200).send(trends);
});

const create = catchAsync(async (req, res) => {
	const { headers, body } = req;
	const pweet = await pweetService.create({ headers, body });
	if (!pweet) return res.status(500).send(DB_ERROR);
	return res.status(201).send(pweet);
});

const updateLikes = catchAsync(async (req, res) => {
	const { pweet_id: pid } = req.body;
	const { authorization } = req.headers;

	const token = extractTokenHeader(authorization);

	const queryResult = await pweetService.updateLikes({ token, pid });
	if (queryResult.code === 500) return res.status(500).send(DB_ERROR);
	if (queryResult.code === 404) {
		const response = handle404(deletionQuery.error);
		return res.status(404).send(response);
	}
	return res.status(200).send(queryResult);
});

const remove = catchAsync(async (req, res) => {
	const { pweet_id: pid } = req.body;
	const { authorization } = req.headers;
	const token = extractTokenHeader(authorization);

	const queryResult = await pweetService.remove({ token, pid });

	if (queryResult.code === 404) {
		const response = handle404(queryResult.error);
		return res.status(404).send(response);
	}
	if (!queryResult.deletedCount) return res.status(500).send(DB_ERROR);
	return res.status(200).send(queryResult);
});

module.exports = {
	create,
	remove,
	queryAll,
	updateLikes,
	queryTrends,
	queryByHashtag,
};
