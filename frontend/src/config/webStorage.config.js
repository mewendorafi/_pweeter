import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => ({
	getItem: _key => Promise.resolve(null),
	setItem: (_key, value) => Promise.resolve(value),
	removeItem: _key => Promise.resolve(),
});

export default typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();
