import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";

// mudar estilos da NavCostum
// adicionar Brand

function NavCostum() {
  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="lm5a_project/ideal11">11 Ideal</Nav.Link>
        </Nav>

        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
          <Nav.Link href="lm5a_project/login">Login</Nav.Link>
          <Nav.Link href="lm5a_project/signIn">Sign In</Nav.Link>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {};
};

export default connect(mapStateToProps)(NavCostum);
