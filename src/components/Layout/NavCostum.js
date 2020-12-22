import { Link } from "react-router-dom"

export default function NavCostum(){
return(
     <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            
             <Nav className="mr-auto">
                <Link to="">
                     <Nav.Link href="#home">11 Ideal</Nav.Link>
                </Link>    
            </Nav>
            
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                 <Button variant="outline-success">Search</Button>
            </Form>
            <Nav className="ml-auto">
                <Nav.Link href="#home">11 Ideal</Nav.Link>
            </Nav>
        </Navbar.Collapse>
  </Navbar>
)
}