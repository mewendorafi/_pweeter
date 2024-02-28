const userService = require('./user.service');
const { PweetModel: Pweet } = require('../database/models');

async function queryById(pid) {
	return await Pweet.findById(pid);
}

async function create({ headers, body }) {
	const { authorization } = headers;
	const token = authorization.split(' ')[1];
	const user = await userService.queryByToken(token);
	body.author = user._id;
	return await Pweet.create(body);
}

async function queryAll() {
	// Populate and select specific fields to return (for security purposes)
	return await Pweet.find()
		.populate('author', ['username', 'firstname', 'lastname'])
		.populate('likes', ['username'])
		.sort({ createdAt: 'desc' });
}

async function queryTrends() {
	const pweets = await Pweet.find({ content: { $regex: /#/ } });

	const hashtags = pweets.flatMap(pweet =>
		pweet.content
			.split(' ')
			.filter(word => word.startsWith('#') && word.length > 1)
	);

	const trends = hashtags.reduce((array, hashtag) => {
		const trendIndex = array.findIndex(trend => trend.hashtag === hashtag);
		if (trendIndex === -1) {
			array.push({ hashtag, count: 1 });
		} else {
			array[trendIndex].count++;
		}
		return array;
	}, []);

	return trends.sort((a, b) => b.count - a.count);
}

async function queryByHashtag(hashtag) {
	return await Pweet.find({
		content: { $regex: new RegExp(`#${hashtag}`, 'i') },
	})
		.populate('author', ['username', 'firstname', 'lastname'])
		.populate('likes', ['username'])
		.sort({ createdAt: 'desc' });
}

async function updateLikes(body) {
	const { token, pid } = body;
	const user = await userService.queryByToken(token);
	if (!user) return { success: false, code: 404, error: 'No user found' };

	const pweet = await queryById(pid);
	if (!pweet) return { success: false, code: 404, error: 'No pweet found' };

	const update = pweet.likes.includes(user._id)
		? { $pull: { likes: user._id } }
		: { $push: { likes: user._id } };

	const acknowledged = await Pweet.findOneAndUpdate({ _id: pweet._id }, update);

	return acknowledged
		? { success: true, code: 200, error: null }
		: {
				success: false,
				code: 500,
				error: 'An Internal Server Error occured while querying database',
		  };
}

async function remove(body) {
	const { token, pid } = body;
	const user = await userService.queryByToken(token);
	if (!user) return { success: false, code: 404, error: 'No user found' };

	const pweet = await queryById(pid);
	if (!pweet) return { success: false, code: 404, error: 'No pweet found' };

	if (String(pweet.author._id) === String(user._id))
		return await Pweet.deleteOne({ _id: pweet._id });
}

module.exports = {
	create,
	remove,
	queryAll,
	queryById,
	updateLikes,
	queryTrends,
	queryByHashtag,
};
