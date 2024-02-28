function isObjectId(value, helpers) {
	if (value.match(/^[0-9a-fA-F]{24}$/)) return value;
	return helpers.message('"{{#label}}" must be a valid mongo id');
}

function isValidPassword(value, helpers) {
	if (value.length < 12)
		return helpers.message('Password must be at least 12 characters');
	if (
		!value.match(/\d/) ||
		!value.match(/[a-zA-Z]/) ||
		!value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
	)
		return helpers.message(
			'Password must contain at least 1 letter, 1 number & 1 symbol'
		);
	return value;
}

module.exports = {
	isObjectId,
	isValidPassword,
};
