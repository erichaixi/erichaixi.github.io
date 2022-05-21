import './Header.css';

import {Nav, Navbar, Container} from "react-bootstrap";

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="ericxi.com">EricXi.com</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#Projects">Projects</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;