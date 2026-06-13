import { render, screen, act } from '@testing-library/react'
import { useContext } from 'react'
import { AuthContext, AuthProvider } from '../../context/AuthContext'

const FAKE_USER = { id: 1, username: 'admin', password: '123', name: 'Admin User', role: 'admin' }

function StateReader() {
  const { state } = useContext(AuthContext)
  return (
    <div>
      <span data-testid="auth">{state.isAuthenticated ? 'true' : 'false'}</span>
      <span data-testid="user">{state.user ? state.user.username : 'null'}</span>
      <span data-testid="error">{state.error ?? 'null'}</span>
      <span data-testid="loading">{state.isLoading ? 'true' : 'false'}</span>
      <span data-testid="password">{state.user?.password ?? 'null'}</span>
    </div>
  )
}

function ActionDispatcher({ actionType, payload }) {
  const { dispatch } = useContext(AuthContext)
  return (
    <button onClick={() => dispatch({ type: actionType, payload })}>
      dispatch
    </button>
  )
}

function MultiActionDispatcher() {
  const { dispatch } = useContext(AuthContext)
  return (
    <>
      <button
        data-testid="login"
        onClick={() => dispatch({ type: 'LOGIN_SUCCESS', payload: FAKE_USER })}
      >
        login
      </button>
      <button
        data-testid="change-password"
        onClick={() => dispatch({ type: 'CHANGE_PASSWORD', payload: 'newpass456' })}
      >
        change
      </button>
    </>
  )
}

describe('AuthContext — CHANGE_PASSWORD', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('updates user password in state', async () => {
    render(
      <AuthProvider>
        <StateReader />
        <MultiActionDispatcher />
      </AuthProvider>
    )

    await act(async () => {
      screen.getByTestId('login').click()
    })
    expect(screen.getByTestId('user')).toHaveTextContent('admin')

    await act(async () => {
      screen.getByTestId('change-password').click()
    })
    expect(screen.getByTestId('password')).toHaveTextContent('newpass456')
  })

  test('keeps user authenticated after password change', async () => {
    render(
      <AuthProvider>
        <StateReader />
        <MultiActionDispatcher />
      </AuthProvider>
    )

    await act(async () => {
      screen.getByTestId('login').click()
    })
    await act(async () => {
      screen.getByTestId('change-password').click()
    })
    expect(screen.getByTestId('auth')).toHaveTextContent('true')
  })

  test('persists changed password to localStorage', async () => {
    render(
      <AuthProvider>
        <StateReader />
        <MultiActionDispatcher />
      </AuthProvider>
    )

    await act(async () => {
      screen.getByTestId('login').click()
    })
    await act(async () => {
      screen.getByTestId('change-password').click()
    })

    const stored = JSON.parse(localStorage.getItem('user'))
    expect(stored.password).toBe('newpass456')
  })
})

describe('AuthContext — LOGIN_START', () => {
  test('sets isLoading to true', async () => {
    render(
      <AuthProvider>
        <StateReader />
        <ActionDispatcher actionType="LOGIN_START" payload={null} />
      </AuthProvider>
    )

    expect(screen.getByTestId('loading')).toHaveTextContent('false')

    await act(async () => {
      screen.getByRole('button').click()
    })
    expect(screen.getByTestId('loading')).toHaveTextContent('true')
  })

  test('clears error on LOGIN_START', async () => {
    render(
      <AuthProvider>
        <StateReader />
        <ActionDispatcher actionType="LOGIN_START" payload={null} />
      </AuthProvider>
    )

    await act(async () => {
      screen.getByRole('button').click()
    })
    expect(screen.getByTestId('error')).toHaveTextContent('null')
  })
})

describe('AuthContext — localStorage persistence', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('LOGIN_SUCCESS saves user to localStorage', async () => {
    render(
      <AuthProvider>
        <StateReader />
        <ActionDispatcher actionType="LOGIN_SUCCESS" payload={FAKE_USER} />
      </AuthProvider>
    )

    await act(async () => {
      screen.getByRole('button').click()
    })

    const stored = JSON.parse(localStorage.getItem('user'))
    expect(stored.username).toBe('admin')
  })

  test('LOGOUT removes user from localStorage', async () => {
    localStorage.setItem('user', JSON.stringify(FAKE_USER))

    render(
      <AuthProvider>
        <StateReader />
        <ActionDispatcher actionType="LOGOUT" payload={null} />
      </AuthProvider>
    )

    await act(async () => {
      screen.getByRole('button').click()
    })

    expect(localStorage.getItem('user')).toBeNull()
  })

  test('LOGIN_SUCCESS adds loginTime to user', async () => {
    render(
      <AuthProvider>
        <StateReader />
        <ActionDispatcher actionType="LOGIN_SUCCESS" payload={FAKE_USER} />
      </AuthProvider>
    )

    await act(async () => {
      screen.getByRole('button').click()
    })

    const stored = JSON.parse(localStorage.getItem('user'))
    expect(stored).toHaveProperty('loginTime')
  })
})

describe('AuthContext — default case', () => {
  test('unknown action type returns same state', async () => {
    render(
      <AuthProvider>
        <StateReader />
        <ActionDispatcher actionType="UNKNOWN_ACTION" payload={null} />
      </AuthProvider>
    )

    const authBefore = screen.getByTestId('auth').textContent

    await act(async () => {
      screen.getByRole('button').click()
    })

    expect(screen.getByTestId('auth')).toHaveTextContent(authBefore)
  })
})
