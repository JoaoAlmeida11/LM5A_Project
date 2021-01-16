import { useState } from 'react';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';

// import GoogleAuth from '../../functions/Authentication/GoogleAuth';
import { SignUp } from '../../redux/ducks/AuthSlice';
// import { Redirect } from 'react-router-dom'
import GoogleButton from 'react-google-button/dist/react-google-button'; //forced fix do to known issue https://github.com/prescottprue/react-google-button/issues/28

// import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';

// handleSubmit
import { useDispatch } from 'react-redux';

const SignIn = ({ auth }) => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const firebase = useFirebase();
	// const firebaseAuth = firebase.auth();
	// console.log(firebase);
	// console.log(firebaseAuth);

	// TODO: validation of email (@) and password (at least 8 digits with letters, numbers and symbols)
	const EmailHandler = e => {
		e.preventDefault();
		setEmail(e.target.value);
	};
	const PasswordHandler = e => {
		e.preventDefault();
		setPassword(e.target.value);
	};

	const HandleSubmit = ({ e, dispatch }) => {
		e.preventDefault();

		const email = e.target[0].value;
		const password = e.target[1].value;
		console.log(email, password);
		// console.log(e.target[0].value);
		dispatch(SignUp({ email, password, dispatch }));
	};

	const loginWithGoogle = () => {
		const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
		const login = {
			provider: 'google',
			type: 'popup',
			token: FIREBASE_API_KEY,
		};

		// console.log(login);

		return firebase.login(login);
	};
	// TODO: add to another page; give as params email + pass in an obj
	// const ClickSubmit = e => {
	// 	e.preventDefault();
	// 	// console.log(e);
	// 	// const dispatch = useDispatch();
	// 	// dispatch(signUp({ e }));
	// 	console.log(e.target);
	// };

	return (
		<Container>
			<Row className="centerLogin">
				<Col xl={12} lg={6} className="mx-auto my-auto text-center">
					<h3 className="mt-4">Sign In</h3>
				</Col>

				<Col xl={12} lg={6} className="d-flex justify-content-center">
					{!isLoaded(auth) ? (
						<span>Loading...</span>
					) : isEmpty(auth) ? (
						<GoogleButton type="light" onClick={loginWithGoogle} />
					) : (
						<pre>{JSON.stringify(auth, null, 2)}</pre>
					)}
				</Col>
				<Col xl={12} lg={6} className="mx-auto my-auto text-center">
					<h4 className="mt-4">or</h4>
				</Col>
				<Col xl={12} lg={6} className="mx-auto my-auto">
					{/* <Form> */}
					<Form onSubmit={HandleSubmit}>
						<Form.Group className="text-left">
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								autoComplete="email"
								value={email}
								placeholder="Enter email"
								id="email"
								onChange={EmailHandler}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label className="text-left">Password</Form.Label>
							<Form.Control
								autoComplete="current-password"
								type="password"
								value={password}
								placeholder="Enter password"
								id="password"
								onChange={PasswordHandler}
							/>
						</Form.Group>

						<div className="text-center">
							{/* <Button value="submit" variant="primary" onClick={ClickSubmit}> */}
							<Button type="submit" variant="primary">
								Submit
							</Button>
						</div>
						<Form.Text className="forgot-password text-center mt-3">
							Forgot Password?
						</Form.Text>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

const mapStateToProps = state => {
	// console.log(state.firebase);
	return {
		auth: state.firebase.auth,
		// authError: state.auth.authError,
	};
};

// const mapDispatchToProps = dispatch => {
// 	return {
// 		SignIn: creds => dispatch(SignIn(creds)),
// 	};
// };

export default connect(mapStateToProps)(SignIn);
// export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
