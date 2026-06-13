import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useContext } from 'react'
import { AuthProvider, AuthContext } from '../../context/AuthContext'
import Dashboard from '../../components/Dashboard'

const ADMIN_USER = { id: 1, username: 'admin', password: '123', name: 'Admin User', role: 'admin' }
const NORMAL_USER = { id: 2, username: 'user', password: '123', name: 'Normal User', role: 'user' }

function renderDashboardWithUser(user) {
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
        <Dashboard />
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

describe('Dashboard — Change Password toggle', () => {
  test('Change Password button exists', () => {
    renderDashboardWithUser(NORMAL_USER)
    expect(screen.getByRole('button', { name: /Change Password/i })).toBeInTheDocument()
  })

  test('clicking Change Password shows ChangePasswordPage', async () => {
    const user = userEvent.setup()
    renderDashboardWithUser(NORMAL_USER)

    await user.click(screen.getByRole('button', { name: /Change Password/i }))
    expect(screen.getByPlaceholderText(/Current Password/i)).toBeInTheDocument()
  })

  test('clicking Change Password again hides ChangePasswordPage', async () => {
    const user = userEvent.setup()
    renderDashboardWithUser(NORMAL_USER)

    await user.click(screen.getByRole('button', { name: /Change Password/i }))
    expect(screen.getByPlaceholderText(/Current Password/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Change Password/i }))
    expect(screen.queryByPlaceholderText(/Current Password/i)).not.toBeInTheDocument()
  })
})

describe('Dashboard — User List toggle (admin only)', () => {
  test('User List button visible for admin', () => {
    renderDashboardWithUser(ADMIN_USER)
    expect(screen.getByRole('button', { name: /User List/i })).toBeInTheDocument()
  })

  test('User List button NOT visible for normal user', () => {
    renderDashboardWithUser(NORMAL_USER)
    expect(screen.queryByRole('button', { name: /User List/i })).not.toBeInTheDocument()
  })

  test('clicking User List shows UserListPage for admin', async () => {
    const user = userEvent.setup()
    renderDashboardWithUser(ADMIN_USER)

    await user.click(screen.getByRole('button', { name: /User List/i }))
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  test('clicking User List again hides UserListPage', async () => {
    const user = userEvent.setup()
    renderDashboardWithUser(ADMIN_USER)

    await user.click(screen.getByRole('button', { name: /User List/i }))
    expect(screen.getByRole('table')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /User List/i }))
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})

describe('Dashboard — login time display', () => {
  test('displays login time after login', () => {
    renderDashboardWithUser(ADMIN_USER)
    expect(screen.getByText(/Login Time/i)).toBeInTheDocument()
  })
})
