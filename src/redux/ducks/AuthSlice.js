import { createSlice } from '@reduxjs/toolkit';
import { getFirebase } from 'react-redux-firebase';
import { useDispatch } from 'react-redux';

//TODO: check if works
// based of https://github.com/iamshaunjp/React-Redux-Firebase-App/blob/lesson-39/marioplan/src/store/actions/authActions.js
// export const logIn = credentials => {
// 	return (dispatch, getState, { getFirebase }) => {
// 		const firebase = getFirebase();

// 		firebase
// 			.auth()
// 			.signInWithEmailAndPassword(credentials.email, credentials.password)
// 			.then(() => {
// 				dispatch({ type: 'auth/loginSuccess' });
// 			})
// 			.catch(err => {
// 				dispatch({ type: 'auth/loginError', err });
// 			});
// 	};
// };
//TODO: check if works
export const LogOut = dispatch => {
	const firebase = getFirebase();
	return firebase
		.auth()
		.signOut()
		.then(() => {
			dispatch(logOutSuccess());
		});
};
//TODO: check if works
//! stopped giving error at least
export const SignUp = ({ email, password, dispatch }) => {
	console.log('SignUp - Here');
	const firebase = getFirebase();

	return firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(user => {
			dispatch(signUpSuccess({ user }));
			// dispatch({ type: 'auth/signUpSuccess', payload: { user } });
		})
		.catch(err => {
			dispatch(signUpError({ err }));
			// dispatch({ type: 'auth/signUpError', payload: { err } });
		});
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

			console.log('signUpSuccess');
			console.log(payload);
		},
		signUpError(state, { payload }) {
			console.log('signup error');
			console.log(payload.err);
			state.errorMessage = payload.err;
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
