import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logOutSuccess } from '../../redux/FireBase/AuthFireBase';

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

const GoogleAuth = () => {
	const isLogged = useSelector(state => state.auth.isLogged);
	console.log('IsLogged useSelector: ' + isLogged);
	const dispatch = useDispatch();

	useEffect(() => {
		const onAuthChange = () => {
			if (isLogged) {
				dispatch(
					loginSuccess(
						window.gapi.auth2.getAuthInstance().currentUser.get().getId()
					)
				);
			} else {
				dispatch(logOutSuccess());
			}
		};

		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: FIREBASE_API_KEY,
					scope: 'email',
				})
				.then(() => {
					onAuthChange(window.gapi.auth2.getAuthInstance().isLogged.get());
					console.log(
						'isLogged.get(): ' +
							window.gapi.auth2.getAuthInstance().isLogged.get()
					);
					window.gapi.auth2.getAuthInstance().isLogged.listen(onAuthChange);
				});
		});
	}, [dispatch, isLogged]);

	const onloginSuccessOnClick = () => {
		dispatch(window.gapi.auth2.getAuthInstance().loginSuccess());
	};

	const onlogOutSuccessOnClick = () => {
		dispatch(window.gapi.auth2.getAuthInstance().logOutSuccess());
	};

	const renderAuthButton = () => {
		if (isLogged === null) {
			return null;
		} else if (isLogged) {
			return (
				<button
					onClick={onlogOutSuccessOnClick}
					className="ui red google button"
				>
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else {
			return (
				<button
					onClick={onloginSuccessOnClick}
					className="ui red google button"
				>
					<i className="google icon" />
					Sign In with Google
				</button>
			);
		}
	};

	return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;

// export default GoogleAuth;ase.auth().loginSuccessWithRedirect(provider);

//     firebase.auth().getRedirectResult().then(function(result) {
//         if (result.credential) {
//           // This gives you a Google Access Token. You can use it to access the Google API.
//           let token = result.credential.accessToken;
//           // ...
//         }
//         // The signed-in user info.
//         let user = result.user;
//       }).catch(function(error) {
//         // Handle Errors here.
//         let errorCode = error.code;
//         let errorMessage = error.message;
//         // The email of the user's account used.
//         let email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         let credential = error.credential;
//         // ...
//       }); */
