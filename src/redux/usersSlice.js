import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useBootstrapPrefix } from 'react-bootstrap/esm/ThemeProvider';
// documentation: https://redux-toolkit.js.org/usage/usage-guide
// example comparing normal thunk usage with createAsyncThunk
// thunk pattern
// 		A "start" action is dispatched before the request, to indicate that the request is in progress. This may be used to track loading state to allow skipping duplicate requests or show loading indicators in the UI.
// 		The async request is made
// 		Depending on the request result, the async logic dispatches either a "success" action containing the result data, or a "failure" action containing error details. The reducer logic clears the loading state in both cases, and either processes the result data from the success case, or stores the error value for potential display.
//  thunk usage -> reducers
//  createAsyncThunk usage -> extraReducers
export const usersSlice = createSlice({
	name: 'users',
	initialState: {
		loading: 'idle',
		users: [],
	},
	reducers: {
		usersLoading(state, action) {
			if (state.loading === 'idle') {
				state.loading = 'pending';
			}
		},
		usersReceived(state, action) {
			if (state.loading === 'pending') {
				state.loading = 'idle';
				state.users = action.payload;
			}
		},
	},
	extraReducers: {
		[fetchUsersById.fulfilled]: (state, action) => {
			state.users.push(action);
		},
	},
});

export const { usersLoading, usersReceived } = usersSlice.actions;

// old way -> normal thunk
const fetchUsers = () => async dispatch => {
	dispatch(usersLoading());
	const response = await useBootstrapPrefix.fetchAll();
	dispatch(usersReceived(response.data));
};

// new way -> createAsyncThunk

const fetchUsersById = createAsyncThunk(
	'users/fetchByIdStatus',
	async (userId, thunkAPI) => {
		const response = await useBootstrapPrefix.fetch(userId);
		return response.data;
	}
);
