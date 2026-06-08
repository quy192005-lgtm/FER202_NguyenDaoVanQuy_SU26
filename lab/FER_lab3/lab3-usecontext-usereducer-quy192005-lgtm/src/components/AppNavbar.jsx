// src/components/AppNavbar.jsx
import React from 'react'
import { Navbar, Container, Button } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

function AppNavbar() {
  const { state, dispatch } = useAuth()
  const { user } = state

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" role="navigation">
      <Container>
        <Navbar.Brand href="#home">FER202 - Login App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          {user && (
            <>
              <Navbar.Text className="text-white me-3">
                Xin chào, <strong>{user.name}</strong>
              </Navbar.Text>
              <Button 
                variant="outline-light" 
                size="sm" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar