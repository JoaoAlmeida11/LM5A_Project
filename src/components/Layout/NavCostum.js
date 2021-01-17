import {
	Navbar,
	Nav,
	Form,
	FormControl,
	Button,
	Container,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import logOut from '../../functions/Authentication/LogOut';
// mudar estilos da NavCostum
// adicionar Brand

function NavCostum({ isLogged }) {
	return (
		<Container fluid>
			<Navbar bg="light" expand="md">
				<Navbar.Brand href="/lm5a_project/">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/lm5a_project/ideal11/">11 Ideal</Nav.Link>
					</Nav>

					<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-success">Search</Button>
						{!isLogged ? (
							<>
								<Nav.Link href="/lm5a_project/login/">Login</Nav.Link>
								<Nav.Link href="/lm5a_project/signIn/">Sign Up</Nav.Link>
							</>
						) : (
							<Button variant="outline-success" onClick={logOut}>
								LogOut
							</Button>
						)}
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</Container>
	);
}

const mapStateToProps = state => {
	console.log(state);
	return {
		isLogged: state.auth.isLogged,
	};
};

export default connect(mapStateToProps)(NavCostum);
