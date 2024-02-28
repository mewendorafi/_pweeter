export default function httpErrorHandler(response) {
	const error = {};

	switch (response.status) {
		case 400:
			error.code = 400;
			error.message = 'Bad request';
			break;
		case 401:
			error.code = 401;
			error.message = 'Invalid password';
			break;
		case 403:
			error.code = 403;
			error.message = 'Access forbidden';
			break;
		case 404:
			error.code = 404;
			error.message = 'Invalid email';
			break;
		case 500:
			error.code = 500;
			error.message = 'Internal server error... please try again later';
			break;
		default:
			error.code = 500;
			error.message = 'Something unexpected happened... please try again later';
			break;
	}

	return error;
}
