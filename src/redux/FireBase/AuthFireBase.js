import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: '',
		errorMessage: '',
		isLogged: false,
	},
	reducers: {
		loginError(state, { payload }) {
			state.authError = 'Login failed';
			state.errorMessage = payload;
		},
		// see if GoogleAuth is using only one
		// loginSuccess === signUpSuccess
		loginSuccess(state, { payload }) {
			console.log('login success');
			state.isLogged = true;
			// state.token=
		},

		logOutSuccess(state, { payload }) {
			console.log('signout success');
			state.isLogged = false;
		},

		signUpSuccess(state, { payload }) {
			console.log('signup success');
			state.isLogged = true;
		},
		signUpError(state, { payload }) {
			console.log('signup error');
		},
	},
});

export const {
	loginError,
	loginSuccess,
	logOutSuccess,
	signUpSuccess,
	signUpError,
} = authSlice.actions;
export default authSlice.reducer;
