import { useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { findUser } from '../utils/authHelpers'

function LoginForm() {
  const { state, dispatch } = useAuth()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const user = findUser(username, password)

    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
    } else {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Tên đăng nhập hoặc mật khẩu không đúng' })
    }
  }

  return (
    <Card className="mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <Card.Header className="bg-primary text-white text-center">
        <h4>Đăng Nhập</h4>
      </Card.Header>
      
      <Card.Body>
        {state.error && (
          <Alert variant="danger" className="mb-3">
            {state.error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Đăng nhập
          </Button>
        </Form>
      </Card.Body>

      <Card.Footer className="text-center text-muted small">
        Demo: admin / 123
      </Card.Footer>
    </Card>
  )
}

export default LoginForm