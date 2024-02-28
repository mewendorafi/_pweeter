import slices from '../slices';
import { Provider } from 'react-redux';
import storage from '../../config/webStorage.config';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const reducers = combineReducers(slices);
const persistConfig = {
	key: '_pweeter',
	storage,
	blacklist: ['pweets'],
};

const store = configureStore({
	reducer: persistReducer(persistConfig, reducers),
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function StoreProvider({ children }) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>{children}</PersistGate>
		</Provider>
	);
}
