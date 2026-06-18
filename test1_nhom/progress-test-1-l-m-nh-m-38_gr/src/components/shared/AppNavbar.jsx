import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function AppNavbar() {
  return (
    <Navbar expand="lg" sticky="top" className="app-navbar navbar-dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-2">
          <span style={{ fontSize: '1.5rem' }}>⚛️</span> useContext
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto gap-2 mt-3 mt-lg-0">
            <Nav.Link as={NavLink} to="/ex01">Bài 1 – Counter</Nav.Link>
            <Nav.Link as={NavLink} to="/ex02">Bài 2 – Login</Nav.Link>
            <Nav.Link as={NavLink} to="/ex03">Bài 3 – Validation</Nav.Link>
            <Nav.Link as={NavLink} to="/ex04">Bài 4 – Theme</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
