import { useState } from 'react'
import {
  Card,
  Form,
  Button,
  Spinner,
} from 'react-bootstrap'

import { useAuth } from '../hooks/useAuth'
import { findUser } from '../utils/authHelpers'
import { ACTION_TYPES, ERROR_MESSAGES } from '../utils/constants'
import FormAlert from './FormAlert'
import PasswordField from './PasswordField'

function LoginForm() {
  const { state, dispatch } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch({ type: ACTION_TYPES.LOGIN_START })

    const user = findUser(username, password)

    if (user) {
      dispatch({
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: user,
      })
    } else {
      dispatch({
        type: ACTION_TYPES.LOGIN_FAILURE,
        payload: ERROR_MESSAGES.INVALID_CREDENTIALS,
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
        <FormAlert message={state.error} />

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <PasswordField
            placeholder="Password"
            value={password}
            onChange={setPassword}
          />

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
