import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styles from '../styles/auth.module.css';
import { CustomButton, CustomModal } from '../components';

export default function Auth() {
	const router = useRouter();
	const [loginMode, setLoginMode] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const isAuth = useSelector(({ user }) => user.token);

	const closeModal = () => setOpenModal(false);

	// handle redirection after form submission and registering token in local storage
	if (openModal && isAuth) router.push('/');

	function handleAuth(mode) {
		// handle redirection if a valid token is already available in local storage
		if (isAuth) return router.push('/');
		setLoginMode(mode);
		setOpenModal(true);
	}

	return (
		<>
			<Head>
				<title>Pweeter | Login</title>
			</Head>
			<main className={styles.container}>
				<section className={styles.leftSection}>
					<Image src='/images/logo.png' alt='Logo' width={300} height={300} />
				</section>
				<section className={styles.rightSection}>
					<Image src='/images/logo.png' alt='Logo' width={50} height={50} />
					<h2 className={styles.title}>
						See what's<br></br>happening
					</h2>
					<h3>Join Pweeter today.</h3>
					<CustomButton
						handler={() => handleAuth('register')}
						title='Sign up'
						style={styles.signUp}
					/>
					<p>Already have an account?</p>
					<CustomButton
						handler={() => handleAuth('login')}
						title='Sign in'
						style={styles.signIn}
					/>
				</section>

				<CustomModal open={openModal} mode={loginMode} close={closeModal} />
			</main>
		</>
	);
}
