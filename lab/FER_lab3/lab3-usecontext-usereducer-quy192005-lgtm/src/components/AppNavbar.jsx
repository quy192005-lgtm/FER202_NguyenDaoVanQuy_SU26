import { Navbar, Container, Button } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

function AppNavbar() {
  const { state, dispatch } = useAuth()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>FER202 - Login App</Navbar.Brand>
        
        <Navbar.Text className="me-auto">
          Xin chào, <strong>{state.user?.name}</strong>
        </Navbar.Text>

        <Button 
          variant="outline-light" 
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Container>
    </Navbar>
  )
}

export default AppNavbar