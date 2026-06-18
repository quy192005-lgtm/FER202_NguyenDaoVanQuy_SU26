import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Navbar className="main-header">
      <Container>
        <Navbar.Brand className="d-flex align-items-center m-0">
          <img src="/images/image.jpg" className="logo-img" alt="" />
          <span className="app-name">Course Management System</span>
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          {user && (
            <>
              <Navbar.Text className="signed-in me-3">
                Signed in as <strong>{user.fullName}</strong>
              </Navbar.Text>
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
