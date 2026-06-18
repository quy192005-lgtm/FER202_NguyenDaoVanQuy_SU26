import { Card, Badge, Button, Container } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

function Dashboard() {
  const { state, dispatch } = useAuth()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <Container className="mt-5">
      <Card className="mx-auto" style={{ maxWidth: '500px' }}>
        <Card.Body className="text-center">
          <h2 className="mb-4">Xin chào, {state.user?.name}!</h2>
          
          <div className="mb-3">
            <p>Username: {state.user?.username}</p>
          </div>
          
          <div className="mb-4">
            <Badge 
              bg={state.user?.role === 'admin' ? 'danger' : 'success'}
              className="fs-5 px-4 py-2"
            >
              {state.user?.role}
            </Badge>
          </div>

          <Button 
            variant="danger" 
            size="lg"
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        </Card.Body>
      </Card>
    </Container>
  )
}
//sdf
export default Dashboard