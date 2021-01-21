import {
	Navbar,
	Nav,
	Form,
	// FormControl,
	Button,
	Image,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import logOut from '../../functions/Authentication/LogOut';
// import logo from '../../logo.png';
// mudar estilos da NavCostum
// adicionar Brand
import logo from '../../logo.png';

// const url = process.env.PUBLIC_URL;

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
						{/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-success">Search</Button> */}
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
