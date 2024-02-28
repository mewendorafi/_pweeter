const extractTokenHeader = authorization => {
	// regex to check if header has "Bearer" followed by whitespace
	const regex = /^Bearer /;
	const bearer = regex.test(authorization);
	if (!bearer) return authorization;
	return authorization.split(' ')[1];
};

module.exports = extractTokenHeader;
