import { createSlice } from '@reduxjs/toolkit';

const initialState = { firstname: null, lastname: null, username: null, email: null, token: null };

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (_, action) => action.payload,
		logout: () => initialState,
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
