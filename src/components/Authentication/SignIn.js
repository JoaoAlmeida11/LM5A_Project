import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// import { connect } from 'react-redux';

// import GoogleAuth from '../../functions/Authentication/GoogleAuth';
// import { signIn } from '../../store/actions/authActions';
//import { Redirect } from 'react-router-dom'
import GoogleButton from 'react-google-button';

import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';

const SignIn = () => {
	const firebase = useFirebase();
	const auth = useSelector(state => state.firebase.auth);

	function loginWithGoogle() {
		return firebase.login({ provider: 'google', type: 'popup' });
	}

	// const auth = useSelector(state => state.firebase.auth);
	// const authError = useSelector(state => state.auth.authError);
	return (
		<Container>
			<Row className="centerLogin">
				<Col xl={12} lg={6} className="mx-auto my-auto">
					<Form>
						<h3 className="text-center mt-4">Sign In</h3>

						{/* <GoogleAuth /> */}
						{!isLoaded(auth) ? (
							<span>Loading...</span>
						) : isEmpty(auth) ? (
							<GoogleButton type="light" onClick={loginWithGoogle} />
						) : (
							<pre>{JSON.stringify(auth, null, 2)}</pre>
						)}

						<Form.Group controlId="formBasicEmail" className="text-left">
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								value="email"
								placeholder="Enter email"
								id="email"
								//  onChange={this.handleChange}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label className="text-left">Password</Form.Label>
							<Form.Control
								value="password"
								placeholder="Enter password"
								id="password"
								//  onChange={this.handleChange}
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

// const mapStateToProps = state => {
// 	return {
// 		auth: state.firebase.auth,
// 		authError: state.auth.authError,
// 	};
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		SignIn: creds => dispatch(SignIn(creds)),
// 	};
// };

export default SignIn;
// export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
