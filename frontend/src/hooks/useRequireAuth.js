import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function useRequireAuth() {
	const router = useRouter();
	const isAuth = useSelector(({ user }) => user.token);
	if (!isAuth) router.push('/auth');
	return isAuth;
}
