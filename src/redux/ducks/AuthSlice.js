import { createSlice } from '@reduxjs/toolkit';

//TODO: check if works
// based of https://github.com/iamshaunjp/React-Redux-Firebase-App/blob/lesson-39/marioplan/src/store/actions/authActions.js
export const logIn = credentials => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				dispatch({ type: 'auth/loginSuccess' });
			})
			.catch(err => {
				dispatch({ type: 'auth/loginError', err });
			});
	};
};
//TODO: check if works
export const logOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: 'auth/logOutSuccess' });
			});
	};
};
//TODO: check if works
export const signUp = newUser => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then(() => {
				dispatch({ type: 'SIGNUP_SUCCESS' });
			})
			.catch(err => {
				dispatch({ type: 'SIGNUP_ERROR', err });
			});
	};
};

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: '',
		errorMessage: '',
		isLogged: false,
		firebaseInit: false,
	},
	reducers: {
		// see if GoogleAuth is using only one
		// loginSuccess === signUpSuccess
		loginSuccess(state) {
			console.log('login success');
			state.isLogged = true;
			// state.token=
		},
		loginError(state, { payload }) {
			state.authError = 'Login failed';
			state.errorMessage = payload;
		},
		//needed
		logOutSuccess(state) {
			console.log('logout success');
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
