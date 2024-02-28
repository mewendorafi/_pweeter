import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from '../styles/Trends.module.css';

export default function Trends() {
	const user = useSelector(({ user }) => user);
	const pweets = useSelector(({ pweets }) => pweets);
	const { token } = user;

	const [trends, setTrends] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/pweet/trends', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
			.then(response => response.json())
			.then(trends => Array.isArray(trends) && setTrends(trends));
	}, [pweets]);

	return (
		<div className={styles.container}>
			{trends.length ? (
				trends.map(({ hashtag, count }, i) => (
					<Link key={i} href={`/hashtag/${hashtag.slice(1)}`}>
						<div className={styles.pweetContainer}>
							<h3 className={styles.hashtag}>{hashtag}</h3>
							<h4 className={styles.nbrPweet}>
								{count} Pweet{count > 1 ? 's' : ''}
							</h4>
						</div>
					</Link>
				))
			) : (
				<p style={{ textAlign: 'center', margin: 0, padding: 8 }}>
					No trends yet... make your own !
				</p>
			)}
		</div>
	);
}
