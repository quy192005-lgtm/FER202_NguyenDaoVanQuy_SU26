import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

// TODO-NAVBAR-1: Render a Navbar component from react-bootstrap
// Requirements:
//   1. Wrap with <Navbar> and <Container> to produce a <nav> element
//   2. Display brand text "Pizzas" using <Navbar.Brand>
//   3. Add at least one <Nav.Link> (e.g. Home, About, Contact)
export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Pizzas</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}