import { render, screen, act } from '@testing-library/react'
import { useContext } from 'react'
import { AuthProvider, AuthContext } from '../../context/AuthContext'
import UserListPage from '../../pages/UserListPage'
import USERS from '../../data/users'

const ADMIN_USER = { id: 1, username: 'admin', password: '123', name: 'Admin User', role: 'admin' }
const NORMAL_USER = { id: 2, username: 'user', password: '123', name: 'Normal User', role: 'user' }

function renderUserListWithUser(user) {
  function Inner() {
    const { dispatch } = useContext(AuthContext)
    return (
      <>
        <button
          data-testid="login-trigger"
          onClick={() => dispatch({ type: 'LOGIN_SUCCESS', payload: user })}
        >
          login
        </button>
        <UserListPage />
      </>
    )
  }
  const utils = render(
    <AuthProvider>
      <Inner />
    </AuthProvider>
  )
  act(() => {
    utils.getByTestId('login-trigger').click()
  })
  return utils
}

describe('UserListPage — admin access', () => {
  test('renders user list heading for admin', () => {
    renderUserListWithUser(ADMIN_USER)
    expect(screen.getByText(/User List/i)).toBeInTheDocument()
  })

  test('renders a table for admin', () => {
    renderUserListWithUser(ADMIN_USER)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  test('table has correct column headers', () => {
    renderUserListWithUser(ADMIN_USER)
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
  })

  test('renders all users from data', () => {
    renderUserListWithUser(ADMIN_USER)
    USERS.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument()
    })
  })

  test('does not show access denied alert for admin', () => {
    renderUserListWithUser(ADMIN_USER)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

describe('UserListPage — non-admin access', () => {
  test('shows access denied alert for normal user', () => {
    renderUserListWithUser(NORMAL_USER)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/không có quyền/i)).toBeInTheDocument()
  })

  test('does not render table for normal user', () => {
    renderUserListWithUser(NORMAL_USER)
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  test('does not render user list heading for normal user', () => {
    renderUserListWithUser(NORMAL_USER)
    expect(screen.queryByText(/User List/i)).not.toBeInTheDocument()
  })
})
