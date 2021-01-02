import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		authError: null,
	},
	reducers: {
		loginError(state) {
			console.log('login error');
			state.authError = 'Login failed';
		},
		loginSuccess(state) {
			console.log('login success');
			state.authError = null;
		},
		signOutSuccess(state) {
			console.log('signout success');
			state.authError = null;
		},
		signUpSuccess(state) {
			console.log('signup success');
			state.authError = null;
		},
		signUpError(state, { payload }) {
			console.log('signup error');
			state.authError = payload.err.message;
		},
	},
});

export default authSlice.reducer;
