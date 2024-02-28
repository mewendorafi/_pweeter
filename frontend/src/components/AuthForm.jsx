import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import CustomButton from './CustomButton';
import { login } from '../redux/slices/user.slice';
import styles from '../styles/LoginForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import validateAuthForm from '../utils/validateAuthForm';
import httpErrorHandler from '../utils/httpErrorHandler';

const DEFAULT_OPTIONS = {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
};

export default function AuthForm({ mode }) {
	const router = useRouter();
	const dispatch = useDispatch();
	const [error, setError] = useState(null);
	const isAuth = useSelector(({ user }) => user.token);
	const [form, setForm] = useState({
		email: '',
		password: '',
		username: '',
		firstname: '',
		lastname: '',
	});

	function handleSubmit() {
		setError(null);
		if (isAuth) return router.push('/');
		const { email, password, username, firstname, lastname } = form;

		const error = validateAuthForm(form, mode);
		if (error) return setError(error);

		const register_body = JSON.stringify({
			firstname,
			lastname,
			username,
			email,
			password,
		});

		const login_body = JSON.stringify({ email, password });
		const options = {
			...DEFAULT_OPTIONS,
			body: mode === 'register' ? register_body : login_body,
		};

		fetch(`http://localhost:3000/auth/${mode}`, options)
			.then(response => {
				if (response.ok) return response.json();
				const error = httpErrorHandler(response);
				if (error.code && error.code === 400)
					return setError('Please, provide a valid email');
				return setError(error.message);
			})
			.then(
				response =>
					response &&
					response.token &&
					dispatch(
						login({ token: response.token, username, firstname, lastname })
					)
			);
	}

	function handleInput(e) {
		const { name, value } = e.target;
		setForm(previous => ({
			...previous,
			[name]: value,
		}));
	}

	const { email, password, username, firstname, lastname } = form;

	return (
		<div className={styles.container}>
			<Image src='/images/logo.png' alt='Logo' width={50} height={50} />
			<h3 className={styles.title}>
				{mode === 'register' ? 'Create your account' : 'Log in to your account'}
			</h3>
			{mode === 'register' ? (
				<>
					<input
						type='text'
						name='firstname'
						value={firstname}
						onChange={handleInput}
						placeholder='Firstname'
						className={styles.input}
						onFocus={() => setError(null)}
					/>
					<input
						type='text'
						name='lastname'
						value={lastname}
						placeholder='Lastname'
						onChange={handleInput}
						className={styles.input}
						onFocus={() => setError(null)}
					/>
					<input
						type='text'
						name='username'
						value={username}
						placeholder='Username'
						onChange={handleInput}
						className={styles.input}
						onFocus={() => setError(null)}
					/>
				</>
			) : null}

			<input
				type='email'
				name='email'
				value={email}
				placeholder='Email'
				onChange={handleInput}
				className={styles.input}
				onFocus={() => setError(null)}
			/>
			<input
				type='password'
				name='password'
				value={password}
				placeholder='Password'
				onChange={handleInput}
				className={styles.input}
				onFocus={() => setError(null)}
			/>
			<CustomButton
				handler={handleSubmit}
				title={mode === 'register' ? 'Sign Up' : 'Sign In'}
				style={styles.button}
			/>
			<h4 className='error'>{error ? error : null}</h4>
		</div>
	);
}
