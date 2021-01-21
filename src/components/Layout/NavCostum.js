import { Navbar, Nav, Form, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import logOut from '../../functions/Authentication/LogOut';

import logo from '../../logo.png';

export const NavCostum = ({ isLogged }) => {
	return (
		<Navbar className="navCostum pr-5 pl-5" variant="light" expand="md">
			<Navbar.Brand>
				<a href="/soccer/">
					<Image src={logo} alt="logo" className="w-50" />
				</a>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<Form inline>
						{!isLogged ? (
							<>
								<Nav.Link href="/soccer/login/" className="text-white">
									Login
								</Nav.Link>
								<Nav.Link href="/soccer/signIn/" className="text-white ml-4">
									Sign Up
								</Nav.Link>
							</>
						) : (
							<Button
								variant="outline-success"
								onClick={logOut}
								className="text-white"
							>
								LogOut
							</Button>
						)}
					</Form>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

const mapStateToProps = state => {
	return {
		isLogged: state.auth.isLogged,
	};
};

export default connect(mapStateToProps)(NavCostum);
