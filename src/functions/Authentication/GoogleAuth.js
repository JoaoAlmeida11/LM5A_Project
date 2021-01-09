// TODO: if already implemented remove
// // import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// // import { loginSuccess, logOutSuccess } from '../../redux/ducks/AuthSlice';
// import { Button } from 'react-bootstrap';

// // const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

// const isFirebaseInit = firebaseInit => {
// 	if (firebaseInit === false) window.gapi.auth2.init();
// };

// const GoogleAuth = () => {
// 	const isLogged = useSelector(state => state.auth.isLogged);
// 	const firebaseInit = useSelector(state => state.auth.firebaseInit);

// 	isFirebaseInit(firebaseInit);

// 	console.log('IsLogged useSelector: ' + isLogged);

// 	const dispatch = useDispatch();

// 	// useEffect(() => {
// 	// 	const onAuthChange = () => {
// 	// 		if (isLogged) {
// 	// 			dispatch(
// 	// 				loginSuccess(
// 	// 					window.gapi.auth2.getAuthInstance().currentUser.get().getId()
// 	// 				)
// 	// 			);
// 	// 		} else {
// 	// 			dispatch(logOutSuccess());
// 	// 		}
// 	// 	};

// 	// 	window.gapi.load('client:auth2', () => {
// 	// 		window.gapi.client
// 	// 			.init({
// 	// 				clientId: FIREBASE_API_KEY,
// 	// 				scope: 'email',
// 	// 			})
// 	// 			.then(() => {
// 	// 				onAuthChange(window.gapi.auth2.getAuthInstance().isLogged.get());
// 	// 				console.log(
// 	// 					'isLogged.get(): ' +
// 	// 						window.gapi.auth2.getAuthInstance().isLogged.get()
// 	// 				);
// 	// 				window.gapi.auth2.getAuthInstance().isLogged.listen(onAuthChange);
// 	// 			});
// 	// 	});
// 	// }, [dispatch, isLogged]);

// 	const logOutOnClick = () => {
// 		dispatch(window.gapi.auth2.getAuthInstance().loginSuccess());
// 	};

// 	const loginOnClick = () => {
// 		dispatch(window.gapi.auth2.getAuthInstance().logOutSuccess());
// 	};

// 	const renderAuthButton = () => {
// 		if (isLogged === null) return null;
// 		else if (isLogged) {
// 			return (
// 				<Button onClick={logOutOnClick} className="ui red google button">
// 					<i className="google icon" />
// 					Sign Out
// 				</Button>
// 			);
// 		} else {
// 			return (
// 				<Button onClick={loginOnClick} className="ui red google button">
// 					<i className="google icon" />
// 					Sign In with Google
// 				</Button>
// 			);
// 		}
// 	};

// 	return <div>{renderAuthButton()}</div>;
// };

// export default GoogleAuth;

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
