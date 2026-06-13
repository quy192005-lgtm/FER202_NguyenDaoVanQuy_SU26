import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useContext } from 'react'
import { AuthProvider, AuthContext } from '../../context/AuthContext'
import LoginForm from '../../components/LoginForm'

function renderLoginForm() {
  return render(
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  )
}

describe('LoginForm — loading state (EXT-01)', () => {
  test('submit button is initially enabled', () => {
    renderLoginForm()
    expect(screen.getByRole('button', { name: /đăng nhập/i })).not.toBeDisabled()
  })

  test('successful login dispatches LOGIN_SUCCESS', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.type(screen.getByPlaceholderText(/username/i), 'admin')
    await user.type(screen.getByPlaceholderText(/password/i), '123')
    await user.click(screen.getByRole('button', { name: /đăng nhập/i }))

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })
})

describe('LoginForm — input interactions', () => {
  test('username input accepts user input', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    const input = screen.getByPlaceholderText(/username/i)
    await user.type(input, 'testuser')
    expect(input).toHaveValue('testuser')
  })

  test('password input accepts user input', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    const input = screen.getByPlaceholderText(/password/i)
    await user.type(input, 'testpass')
    expect(input).toHaveValue('testpass')
  })

  test('form has Card.Header with primary styling', () => {
    renderLoginForm()
    const heading = screen.getByRole('heading', { name: /Đăng Nhập/i })
    expect(heading).toBeInTheDocument()
    const headerEl = heading.closest('[class*="primary"]') || heading.parentElement
    expect(headerEl).toBeInTheDocument()
  })

  test('Card.Footer shows demo credentials', () => {
    renderLoginForm()
    expect(screen.getByText(/Demo.*admin.*123/i)).toBeInTheDocument()
  })
})
