import { Form, Button } from 'react-bootstrap';

export default function Login() {
	return (
		<main className="container">
			<section className="row centerLogin">
				<article className="col-12 col-lg-6 mx-auto my-auto">
					<Form>
						<h3 className="text-center mt-4">Sign In</h3>
						<Form.Group controlId="formBasicEmail" className="text-left">
							<Form.Label>Email Address</Form.Label>
							<Form.Control value="email" placeholder="Enter email" />
						</Form.Group>

						<Form.Group>
							<Form.Label className="text-left">Password</Form.Label>
							<Form.Control value="password" placeholder="Enter password" />
						</Form.Group>

						<Form.Group className="text-center">
							<Form.Check
								type="checkbox"
								id="customCheck1"
								label="Remember me"
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
				</article>
			</section>
		</main>
	);
}
