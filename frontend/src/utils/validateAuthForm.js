const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex =
	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/;

export default function validateAuthForm(form, mode) {
	const { email, password, username, firstname, lastname } = form;

	if (mode === 'register') {
		if (!email || !password || !username || !firstname || !lastname)
			return 'Please, fill in all fields';
	}

	if (!email || !password) return 'Please, fill in all fields';

	if (!emailRegex.test(email)) return 'Please, enter a valid email';

	if (!passwordRegex.test(password))
		return 'Password must be at least 12 characters (min. 1 letter, 1 number, 1 symbol)';

	return null;
}
