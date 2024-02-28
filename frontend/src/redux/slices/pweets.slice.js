import { createSlice } from '@reduxjs/toolkit';

export const pweetsSlice = createSlice({
	name: 'pweets',
	initialState: [],
	reducers: {
		loadPweets: (_, { payload: pweets }) => pweets,
		addPweet: (state, { payload: newPweet }) => [newPweet, ...state],
		likePweet: (state, { payload }) => {
			const index = state.findIndex(pweet => pweet._id === payload.pweet_id);
			const isLiked = state[index].likes.some(user => user.username === payload.username);

			if (isLiked) state[index].likes = state[index].likes.filter(user => user.username !== payload.username);
			else state[index].likes.push({ username: payload.username });
		},
		deletePweet: (state, { payload: pweet_id }) => state.filter(pweet => pweet._id !== pweet_id),
	},
});

export const { loadPweets, addPweet, likePweet, deletePweet } = pweetsSlice.actions;
export default pweetsSlice.reducer;
