import Link from 'next/link';
import Image from 'next/image';
import CustomButton from './CustomButton';
import { logout } from '../redux/slices/user.slice';
import styles from '../styles/LeftSection.module.css';
import { useDispatch, useSelector } from 'react-redux';

export default function LeftSection() {
	const dispatch = useDispatch();
	const user = useSelector(({ user }) => user);

	return (
		<section className={styles.leftSection}>
			<div>
				<Link href='/'>
					<Image
						src='/images/logo.png'
						alt='Logo'
						width={50}
						height={50}
						className={styles.logo}
					/>
				</Link>
			</div>
			<div>
				<div className={styles.userSection}>
					<Image
						src='/images/avatar.png'
						alt='Avatar'
						width={46}
						height={46}
						className={styles.avatar}
					/>
					<div className={styles.userInfo}>
						<p className={styles.name}>{user.firstname}</p>
						<p className={styles.username}>@{user.username}</p>
					</div>
				</div>
				<CustomButton
					handler={() => dispatch(logout())}
					title='Logout'
					style={styles.logout}
				/>
			</div>
		</section>
	);
}
