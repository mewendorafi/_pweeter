import Loading from '../components/Loading';
import useRequireAuth from '../hooks/useRequireAuth';

export const AppContextWrapper = WrappedComponent => props => {
	// handle contextual logic like authentication, background checks...
	const isAuth = useRequireAuth();
	return isAuth ? <WrappedComponent {...props} /> : <Loading />;
};
