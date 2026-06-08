import {
  Card,
  Badge,
  Button,
  Container,
} from 'react-bootstrap'

import { useState } from 'react'

import { useAuth } from '../hooks/useAuth'

import ChangePasswordPage from '../pages/ChangePasswordPage'
import UserListPage from '../pages/UserListPage'

function Dashboard() {
  const { state, dispatch } =
    useAuth()

  const [showPassword, setShowPassword] =
    useState(false)

  const [showUsers, setShowUsers] =
    useState(false)

  return (
    <Container className="mt-5">
      <Card className="mx-auto">
        <Card.Body>
          <h2>
            Xin chào,
            {' '}
            {state.user?.name}
          </h2>

          <p>
            Username:
            {' '}
            {state.user?.username}
          </p>

          <p>
            Login Time:
            {' '}
            {state.user?.loginTime}
          </p>

          <Badge
            bg={
              state.user?.role ===
              'admin'
                ? 'danger'
                : 'success'
            }
          >
            {state.user?.role}
          </Badge>

          <div className="mt-4">
            <Button
              className="me-2"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              Change Password
            </Button>

            {state.user?.role ===
              'admin' && (
              <Button
                className="me-2"
                onClick={() =>
                  setShowUsers(
                    !showUsers
                  )
                }
              >
                User List
              </Button>
            )}

            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: 'LOGOUT',
                })
              }
            >
              Đăng xuất
            </Button>
          </div>

          {showPassword && (
            <ChangePasswordPage />
          )}

          {showUsers && (
            <UserListPage />
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Dashboard