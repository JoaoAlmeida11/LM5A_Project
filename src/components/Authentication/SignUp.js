import React from 'react';
import { Formik } from 'formik';
import { connect, useDispatch } from 'react-redux';
import { signUpAction } from '../../redux/ducks/AuthSlice';
import GoogleButton from 'react-google-button/dist/react-google-button'; //forced fix do to known issue https://github.com/prescottprue/react-google-button/issues/28
import { useFirebase } from 'react-redux-firebase';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

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
// export const auth = firebase.auth();
const SignUp = props => {
	const { isLogged } = props;
	const firebase = useFirebase();
	const dispatch = useDispatch();
	const loginWithGoogle = e => {
		e.preventDefault();
		const googleProvider = new firebase.auth.GoogleAuthProvider();
		const auth = firebase.auth();
		auth
			.signInWithPopup(googleProvider)
			.then(res => {
				console.log(res.user);
				dispatch(signUpAction());
				return <Redirect to="/soccer/" />;
			})
			.catch(error => {
				console.log('error.message');
				console.log(error.message);
			});
	};

	const signup = (email, password) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(res => {
				return res && props.signup(email);
			})
			.catch(error => {
				console.log(error);
			});
	};
	if (isLogged === true) return <Redirect to="/soccer/" />;
	return (
		<Container>
			<Row className="centerLogin">
				<Col xl={12} lg={6} className="mx-auto my-auto text-center">
					<h3 className="mt-4">Sign Up</h3>
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
						}}
					>
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
										SignUp
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</Col>
			</Row>
		</Container>
	);
};

const mapStateToProps = state => ({
	isLogged: state.auth.isLogged,
});

const mapDispatchToProps = dispatch => {
	return {
		signup: email => dispatch(signUpAction(email)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
