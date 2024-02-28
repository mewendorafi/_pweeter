import Head from 'next/head';
import Pweet from '../components/Pweet';
import Trends from '../components/Trends';
import { useEffect, useState } from 'react';
import styles from '../styles/index.module.css';
import LeftSection from '../components/LeftSection';
import CustomButton from '../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { AppContextWrapper } from '../utils/AppContextWrapper';
import { loadPweets, addPweet } from '../redux/slices/pweets.slice';

function Index() {
	const dispatch = useDispatch();
	const [newPweet, setNewPweet] = useState('');
	const pweets = useSelector(({ pweets }) => pweets);
	const user = useSelector(({ user }) => user);
	const { token } = user;

	useEffect(() => {
		fetch('http://localhost:3000/pweet', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
			.then(response => response.json())
			.then(
				pweets =>
					Array.isArray(pweets) && pweets.length && dispatch(loadPweets(pweets))
			);
	}, []);

	const handleInputChange = e =>
		newPweet.length < 280 || e.nativeEvent.inputType === 'deleteContentBackward'
			? setNewPweet(e.target.value)
			: null;

	const submitPweet = () => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ content: newPweet }),
		};
		fetch('http://localhost:3000/pweet', options)
			.then(response => response.json())
			.then(pweet => {
				if (pweet) {
					const createdPweet = { ...pweet, author: user };
					dispatch(addPweet(createdPweet));
					setNewPweet('');
				}
			});
	};

	return (
		<>
			<Head>
				<title>Pweeter | Feed</title>
			</Head>
			<main className={styles.container}>
				<LeftSection />

				<section className={styles.middleSection}>
					<h2 className={styles.title}>Feed</h2>
					<div className={styles.createSection}>
						<textarea
							type='text'
							placeholder="What's on your mind ?"
							className={styles.input}
							onChange={e => handleInputChange(e)}
							value={newPweet}
						/>
						<div className={styles.validatePweet}>
							<p>{newPweet.length}/280</p>
							<CustomButton
								title='Pweet'
								style={styles.button}
								handler={submitPweet}
								isDisabled={newPweet.length < 2}
							/>
						</div>
					</div>
					{pweets.length ? (
						pweets.map((props, i) => <Pweet key={i} {...props} />)
					) : (
						<p className='noPweet'>You're all caught up...</p>
					)}
				</section>

				<section className={styles.rightSection}>
					<h2 className={styles.title}>Trends</h2>
					<Trends />
				</section>
			</main>
		</>
	);
}

// Wrap component with the HOC (Higher Order Component) to apply app wide logic (as background auth checks)
export default AppContextWrapper(Index);
