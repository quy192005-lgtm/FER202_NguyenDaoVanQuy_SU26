import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useContext } from 'react'
import { AuthProvider, AuthContext } from '../../context/AuthContext'
import ChangePasswordPage from '../../pages/ChangePasswordPage'

const FAKE_USER = {
  id: 1,
  username: 'admin',
  password: '123',
  name: 'Admin User',
  role: 'admin',
}

function renderChangePasswordLoggedIn(user = FAKE_USER) {
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
        <ChangePasswordPage />
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

describe('ChangePasswordPage — rendering', () => {
  test('renders heading', () => {
    renderChangePasswordLoggedIn()
    expect(screen.getByText(/Change Password/i)).toBeInTheDocument()
  })

  test('renders current password input', () => {
    renderChangePasswordLoggedIn()
    expect(screen.getByPlaceholderText(/Current Password/i)).toBeInTheDocument()
  })

  test('renders new password input', () => {
    renderChangePasswordLoggedIn()
    expect(screen.getByPlaceholderText(/New Password/i)).toBeInTheDocument()
  })

  test('renders confirm password input', () => {
    renderChangePasswordLoggedIn()
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument()
  })

  test('renders save button', () => {
    renderChangePasswordLoggedIn()
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument()
  })

  test('all password inputs have type="password"', () => {
    renderChangePasswordLoggedIn()
    const inputs = [
      screen.getByPlaceholderText(/Current Password/i),
      screen.getByPlaceholderText(/New Password/i),
      screen.getByPlaceholderText(/Confirm Password/i),
    ]
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('type', 'password')
    })
  })

  test('no error alert on initial render', () => {
    renderChangePasswordLoggedIn()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

describe('ChangePasswordPage — validation', () => {
  test('shows error when current password is wrong', async () => {
    const user = userEvent.setup()
    renderChangePasswordLoggedIn()

    await user.type(screen.getByPlaceholderText(/Current Password/i), 'wrong')
    await user.type(screen.getByPlaceholderText(/New Password/i), 'newpass123')
    await user.type(screen.getByPlaceholderText(/Confirm Password/i), 'newpass123')
    await user.click(screen.getByRole('button', { name: /Save/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/không đúng/i)
  })

  test('shows error when new password is less than 6 characters', async () => {
    const user = userEvent.setup()
    renderChangePasswordLoggedIn()

    await user.type(screen.getByPlaceholderText(/Current Password/i), '123')
    await user.type(screen.getByPlaceholderText(/New Password/i), '12345')
    await user.type(screen.getByPlaceholderText(/Confirm Password/i), '12345')
    await user.click(screen.getByRole('button', { name: /Save/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/ít nhất 6/i)
  })

  test('shows error when confirm password does not match', async () => {
    const user = userEvent.setup()
    renderChangePasswordLoggedIn()

    await user.type(screen.getByPlaceholderText(/Current Password/i), '123')
    await user.type(screen.getByPlaceholderText(/New Password/i), 'newpass123')
    await user.type(screen.getByPlaceholderText(/Confirm Password/i), 'different')
    await user.click(screen.getByRole('button', { name: /Save/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/không khớp/i)
  })
})

describe('ChangePasswordPage — successful change', () => {
  test('shows success toast after valid password change', async () => {
    const user = userEvent.setup()
    renderChangePasswordLoggedIn()

    await user.type(screen.getByPlaceholderText(/Current Password/i), '123')
    await user.type(screen.getByPlaceholderText(/New Password/i), 'newpass123')
    await user.type(screen.getByPlaceholderText(/Confirm Password/i), 'newpass123')
    await user.click(screen.getByRole('button', { name: /Save/i }))

    expect(screen.getByText(/Password changed successfully/i)).toBeInTheDocument()
  })

  test('clears form inputs after successful change', async () => {
    const user = userEvent.setup()
    renderChangePasswordLoggedIn()

    await user.type(screen.getByPlaceholderText(/Current Password/i), '123')
    await user.type(screen.getByPlaceholderText(/New Password/i), 'newpass123')
    await user.type(screen.getByPlaceholderText(/Confirm Password/i), 'newpass123')
    await user.click(screen.getByRole('button', { name: /Save/i }))

    expect(screen.getByPlaceholderText(/Current Password/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/New Password/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toHaveValue('')
  })

  test('no error alert with variant danger after successful change', async () => {
    const user = userEvent.setup()
    renderChangePasswordLoggedIn()

    await user.type(screen.getByPlaceholderText(/Current Password/i), '123')
    await user.type(screen.getByPlaceholderText(/New Password/i), 'newpass123')
    await user.type(screen.getByPlaceholderText(/Confirm Password/i), 'newpass123')
    await user.click(screen.getByRole('button', { name: /Save/i }))

    const dangerAlerts = screen.queryAllByRole('alert').filter(
      (el) => el.className.includes('alert-danger')
    )
    expect(dangerAlerts).toHaveLength(0)
  })
})
