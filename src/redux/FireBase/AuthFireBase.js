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
		loginSuccess(state, { payload }) {
			console.log('login success');
			state.isLogged = true;
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

// const { actions } = authSlice;
export default authSlice.reducer;
