import Link from 'next/link';
import Image from 'next/image';
import Moment from 'react-moment';
import styles from '../styles/Pweet.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { likePweet, deletePweet } from '../redux/slices/pweets.slice';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Pweet(props) {
	const dispatch = useDispatch();
	const user = useSelector(({ user }) => user);
	const { token } = user;

	const body = JSON.stringify({ pweet_id: props._id });
	const DEFAULT_OPTIONS = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body,
	};

	function handleLike() {
		const options = {
			method: 'PATCH',
			...DEFAULT_OPTIONS,
		};
		fetch('http://localhost:3000/pweet', options)
			.then(response => response.json())
			.then(
				success =>
					success &&
					dispatch(likePweet({ pweet_id: props._id, username: user.username }))
			);
	}

	function handleDelete() {
		const options = {
			method: 'DELETE',
			...DEFAULT_OPTIONS,
		};
		fetch('http://localhost:3000/pweet', options)
			.then(response => response.json())
			.then(success => success && dispatch(deletePweet(props._id)));
	}

	let likeStyle = {};
	if (props.likes.some(element => element.username === user.username))
		likeStyle = { color: '#f91980', fontFamily: 'Mont' };

	return (
		<div className={styles.container}>
			<div className={styles.userInfo}>
				<Image
					src='/images/avatar.png'
					alt='Avatar'
					width={46}
					height={46}
					className={styles.avatar}
				/>
				<p className={styles.content}>
					<span className={styles.name}>{props.author.firstname}</span>
					<span className={styles.greyText}>
						@{props.author.username} ·{' '}
						<Moment className={styles.greyText} fromNow ago>
							{props.createdAt}
						</Moment>{' '}
						ago
					</span>
				</p>
			</div>

			<p>
				{props.content.split(' ').map((word, i) => {
					if (word.startsWith('#') && word.length > 1)
						return (
							<span key={i} style={{ fontWeight: 'bold' }}>
								<Link href={`/hashtag/${word.slice(1)}`}>{word}</Link>
							</span>
						);
					return word + ' ';
				})}
			</p>

			<FontAwesomeIcon
				icon={faHeart}
				onClick={() => handleLike()}
				className={styles.like}
				style={likeStyle}
			/>
			<span style={likeStyle}>{props.likes.length}</span>

			{props.author.username === user.username && (
				<FontAwesomeIcon
					icon={faTrashCan}
					onClick={() => handleDelete()}
					className={styles.delete}
				/>
			)}
		</div>
	);
}
