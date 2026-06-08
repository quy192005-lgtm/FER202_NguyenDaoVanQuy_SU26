import { useState } from 'react'
import {
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from 'react-bootstrap'

import { useAuth } from '../hooks/useAuth'
import { findUser } from '../utils/authHelpers'

function LoginForm() {
  const { state, dispatch } = useAuth()

  const [username, setUsername] =
    useState('')

  const [password, setPassword] =
    useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch({
      type: 'LOGIN_START',
    })

    const user = findUser(
      username,
      password
    )

    if (user) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      })
    } else {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload:
          'Tên đăng nhập hoặc mật khẩu không đúng',
      })
    }
  }

  return (
    <Card
      className="mx-auto mt-5"
      style={{ maxWidth: '400px' }}
    >
      <Card.Header className="bg-primary text-white text-center">
        <h4>Đăng Nhập</h4>
      </Card.Header>

      <Card.Body>
        {state.error && (
          <Alert variant="danger">
            {state.error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            disabled={state.isLoading}
          >
            {state.isLoading ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                />
                {' '}
                Loading...
              </>
            ) : (
              'Đăng nhập'
            )}
          </Button>
        </Form>
      </Card.Body>

      <Card.Footer>
        Demo: admin / 123
      </Card.Footer>
    </Card>
  )
}

export default LoginForm