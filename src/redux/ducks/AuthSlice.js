import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		userEmail: '',
		isLogged: false,
	},
	reducers: {
		logInAction(state) {
			state.isLogged = true;
		},
		signUpAction(state) {
			state.isLogged = true;
		},
		logOutAction(state) {
			state.isLogged = false;
			state.userEmail = '';
		},
	},
});

export const { logInAction, signUpAction, logOutAction } = authSlice.actions;
export default authSlice.reducer;
