import React from 'react';
// import { Button, TextInput, View, Text } from "react-native";
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { loginAction, signupAction } from '../../redux/ducks/AuthSlice';
// import * as firebase from "firebase";
import GoogleButton from 'react-google-button/dist/react-google-button'; //forced fix do to known issue https://github.com/prescottprue/react-google-button/issues/28
import { useFirebase } from 'react-redux-firebase';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
// import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';

/* Validates the form fields */
const hasValid = values => {
	let errors = {};
	let { email, password } = values;
	if (!email) {
		errors.email = 'Email is required!';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
		errors.email = 'Invalid email address';
	}
	if (!password) {
		errors.password = 'Password is required!';
	} else if (/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$/i.test(password)) {
		errors.password =
			'Password has to be at least 8 characters, one letter and one number';
	}
	return errors;
};

const SignUp = props => {
	const { isLogged } = props;
	const firebase = useFirebase();
	const loginWithGoogle = () => {
		const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
		const login = {
			provider: 'google',
			type: 'popup',
			token: FIREBASE_API_KEY,
		};

		return firebase.login(login);
	};

	// const login = (email, password) => {
	// 	firebase
	// 		.auth()
	// 		.signInWithEmailAndPassword(email, password)
	// 		.then(res => {
	// 			return res && props.login();
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// };

	const signup = (email, password) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(res => {
				console.log('Success create User');
				return res && props.signup();
			})
			.catch(error => {
				console.log(error);
			});
	};
	if (isLogged === true) return <Redirect to="/lm5a_project/" />;
	return (
		<Container>
			<Row className="centerLogin">
				<Col xl={12} lg={6} className="mx-auto my-auto text-center">
					<h3 className="mt-4">Sign In</h3>
				</Col>

				<Col xl={12} lg={6} className="d-flex justify-content-center">
					<GoogleButton type="light" onClick={loginWithGoogle} />
				</Col>
				<Col xl={12} lg={6} className="mx-auto my-auto text-center">
					<h4 className="mt-4">or</h4>
				</Col>
				<Col xl={12} lg={6} className="mx-auto my-auto">
					<Formik
						initialValues={{ email: '', password: '' }}
						validate={hasValid}
						onSubmit={(values, { setSubmitting }) => {
							setSubmitting(true);
							const { email, password } = values;

							try {
								signup(email, password);
							} catch (e) {
								// TODO: error handling
								console.log('Error singUp');
								console.log(e);
								setSubmitting(false);
							}

							// isSignup ? signup(email, password) : login(email, password);
						}}
					>
						{/* Callback function containing Formik state and helpers that handle common form actions */}
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
						}) => (
							<Form onSubmit={handleSubmit}>
								<Form.Group className="text-left">
									<Form.Label>Email Address</Form.Label>
									<Form.Control
										name="email"
										autoComplete="email"
										value={values.email}
										placeholder="Enter email"
										id="email"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{touched.email && errors.email ? (
										<div className="error-message">{errors.email}</div>
									) : null}
								</Form.Group>
								<Form.Group>
									<Form.Label className="text-left">Password</Form.Label>
									<Form.Control
										name="password"
										autoComplete="current-password"
										type="password"
										placeholder="Enter password"
										id="password"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
										required
									/>
									{touched.password && errors.password ? (
										<div className="error-message">{errors.password}</div>
									) : null}
								</Form.Group>

								<div className="text-center">
									<Button
										type="submit"
										variant="primary"
										disabled={isSubmitting}
									>
										Submit
									</Button>
								</div>
								<Form.Text className="forgot-password text-center mt-3">
									Forgot Password?
								</Form.Text>
							</Form>
						)}
					</Formik>
				</Col>
			</Row>
		</Container>
	);
};

const mapStateToProps = state => {
	console.log('mapStateToProps');
	console.log(state);
	return {
		isLogged: state.auth.isLogged,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: () => dispatch(loginAction()),
		signup: () => dispatch(signupAction()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

// import { useState } from 'react';

// import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// import { connect } from 'react-redux';

// // import GoogleAuth from '../../functions/Authentication/GoogleAuth';
// import { signUp } from '../../redux/ducks/AuthSlice';
// // import { Redirect } from 'react-router-dom'

// // import { useSelector } from 'react-redux';
// import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';

// const SignUp = ({ auth }) => {
// 	const emailRef = useRef();
// 	const passwordRef = useRef();
// 	const passwordConfirmRef = useRef();

// 	// const firebase = useFirebase();
// 	// const firebaseAuth = firebase.auth();
// 	// console.log(firebase);
// 	// console.log(firebaseAuth);

// 	// TODO: validation of email (@) and password (at least 8 digits with letters, numbers and symbols)
// 	const EmailHandler = e => {
// 		e.preventDefault();
// 		setEmail(e.target.value);
// 	};
// 	const PasswordHandler = e => {
// 		e.preventDefault();
// 		setPassword(e.target.value);
// 	};

// 	const HandleSubmit = e => {
// 		e.preventDefault();
// 		const email = e.target[0].value;
// 		const password = e.target[1].value;
// 		SignUp({ email, password });
// 	};

// 	const loginWithGoogle = () => {
// 		const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
// 		const login = {
// 			provider: 'google',
// 			type: 'popup',
// 			token: FIREBASE_API_KEY,
// 		};

// 		// console.log(login);

// 		return firebase.login(login);
// 	};
// 	// TODO: add to another page; give as params email + pass in an obj
// 	// const ClickSubmit = e => {
// 	// 	e.preventDefault();
// 	// 	// console.log(e);
// 	// 	// const dispatch = useDispatch();
// 	// 	// dispatch(signUp({ e }));
// 	// 	console.log(e.target);
// 	// };

// 	return (
// 		<Container>
// 			<Row className="centerLogin">
// 				<Col xl={12} lg={6} className="mx-auto my-auto text-center">
// 					<h3 className="mt-4">Sign In</h3>
// 				</Col>

// 				<Col xl={12} lg={6} className="d-flex justify-content-center">
// 					{!isLoaded(auth) ? (
// 						<span>Loading...</span>
// 					) : isEmpty(auth) ? (
// 						<GoogleButton type="light" onClick={loginWithGoogle} />
// 					) : (
// 						<pre>{JSON.stringify(auth, null, 2)}</pre>
// 					)}
// 				</Col>
// 				<Col xl={12} lg={6} className="mx-auto my-auto text-center">
// 					<h4 className="mt-4">or</h4>
// 				</Col>
// 				<Col xl={12} lg={6} className="mx-auto my-auto">
// 					{/* <Form> */}
// 					<Form onSubmit={HandleSubmit}>
// 						<Form.Group className="text-left">
// 							<Form.Label>Email Address</Form.Label>
// 							<Form.Control
// 								autoComplete="email"
// 								value={email}
// 								placeholder="Enter email"
// 								id="email"
// 								onChange={EmailHandler}
// 							/>
// 						</Form.Group>

// 						<Form.Group>
// 							<Form.Label className="text-left">Password</Form.Label>
// 							<Form.Control
// 								autoComplete="current-password"
// 								type="password"
// 								ref={passwordRef}
// 								placeholder="Enter password"
// 								id="password"
// 								required
// 							/>
// 						</Form.Group>

// 						<div className="text-center">
// 							{/* <Button value="submit" variant="primary" onClick={ClickSubmit}> */}
// 							<Button type="submit" variant="primary">
// 								Submit
// 							</Button>
// 						</div>
// 						<Form.Text className="forgot-password text-center mt-3">
// 							Forgot Password?
// 						</Form.Text>
// 					</Form>
// 				</Col>
// 			</Row>
// 		</Container>
// 	);
// };

// const mapStateToProps = state => {
// 	// console.log(state.firebase);
// 	return {
// 		auth: state.firebase.auth,
// 		authError: state.auth.authError,
// 	};
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		signUp: creds => dispatch(signUp(creds)),
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
