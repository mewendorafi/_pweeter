import Head from 'next/head';
import { useRouter } from 'next/router';
import Pweet from '../../components/Pweet';
import { useEffect, useState } from 'react';
import Trends from '../../components/Trends';
import styles from '../../styles/hashtag.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LeftSection from '../../components/LeftSection';
import { loadPweets } from '../../redux/slices/pweets.slice';
import { AppContextWrapper } from '../../utils/AppContextWrapper';

function Hashtag() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { hashtag } = router.query;
	const [query, setQuery] = useState('#');
	const [error, setError] = useState(null);
	const pweets = useSelector(({ pweets }) => pweets);
	const token = useSelector(({ user }) => user.token);

	useEffect(() => {
		if (hashtag) {
			setError(null);
			setQuery(`#${hashtag}`);
			fetch(`http://localhost:3000/pweet/${hashtag}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
				.then(response => response.json())
				.then(pweets =>
					pweets.length
						? dispatch(loadPweets(pweets))
						: setError('No pweets found for this hashtag')
				);
		}
	}, [hashtag]);

	const handleSubmit = () =>
		query.length > 1 ? router.push(`/hashtag/${query.slice(1)}`) : null;

	return (
		<>
			<Head>
				<title>Pweeter | #{hashtag}</title>
			</Head>
			<main className={styles.container}>
				<LeftSection />

				<section className={styles.middleSection}>
					<h2 className={styles.title}>Hashtag</h2>
					<div>
						<div className={styles.searchSection}>
							<input
								type='text'
								onChange={e => setQuery(`#${e.target.value.replace(/^#/, '')}`)}
								onKeyUp={e => e.key === 'Enter' && handleSubmit()}
								value={query}
								className={styles.searchBar}
							/>
						</div>
						{error ? (
							<p className='noPweet'>No pweets found for #{hashtag}</p>
						) : (
							pweets.map((props, i) => <Pweet key={i} {...props} />)
						)}
					</div>
				</section>

				<section className={styles.rightSection}>
					<h2 className={styles.title}>Trends</h2>
					<Trends />
				</section>
			</main>
		</>
	);
}

export default AppContextWrapper(Hashtag);
