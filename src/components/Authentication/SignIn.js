import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';

// import GoogleAuth from '../../functions/Authentication/GoogleAuth';
// import { signIn } from '../../store/actions/authActions';
//import { Redirect } from 'react-router-dom'
import GoogleButton from 'react-google-button/dist/react-google-button'; //forced fix do to known issue https://github.com/prescottprue/react-google-button/issues/28

// import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';

const SignIn = ({ auth }) => {
	const firebase = useFirebase();
	const firebaseAuth = firebase.auth();
	console.log(firebase);
	console.log(firebaseAuth);

	// const auth = useSelector(state => state.firebase.auth);

	function loginWithGoogle() {
		return firebase.login({ provider: 'google', type: 'popup' });
	}

	// const auth = useSelector(state => state.firebase.auth);
	// const authError = useSelector(state => state.auth.authError);

	const handleEmailChange = e => {};
	const handlePasswordChange = e => {};

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
					<Form>
						<Form.Group className="text-left">
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								value="email"
								placeholder="Enter email"
								id="email"
								onChange={handleEmailChange}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label className="text-left">Password</Form.Label>
							<Form.Control
								value="password"
								placeholder="Enter password"
								id="password"
								onChange={handlePasswordChange}
							/>
						</Form.Group>

						<div className="text-center">
							<Button value="submit" variant="primary">
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
	console.log(state.firebase);
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
