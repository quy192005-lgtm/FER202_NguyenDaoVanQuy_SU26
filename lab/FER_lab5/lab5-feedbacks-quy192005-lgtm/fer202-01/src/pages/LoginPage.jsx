import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { validateLogin } from '../utils/validate'

function LoginPage() {
  const { login, loading, error, clearError } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const err = validateLogin(email, password)
    if (err) {
      setLocalError(err)
      return
    }

    setLocalError(null)
    clearError()

    const success = await login({ email, password })
    if (success) {
      navigate('/home')
    }
  }

  const handleCancel = () => {
    setEmail('')
    setPassword('')
    setLocalError(null)
    clearError()
  }

  return (
    <div className="login-page">
      <Card className="login-card">
        <Card.Body className="p-5">
          <h1 className="login-title">Login</h1>

          {(localError || error) && (
            <Alert variant="danger">{localError || error}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={email}
                placeholder="student01@fpt.edu.vn"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text className="text-muted">
                (at least 6 characters)
              </Form.Text>
            </Form.Group>

            <div className="login-actions">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? <Spinner size="sm" animation="border" /> : 'Login'}
              </Button>

              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default LoginPage