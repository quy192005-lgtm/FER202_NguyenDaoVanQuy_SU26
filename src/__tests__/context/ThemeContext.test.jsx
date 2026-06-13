import { render, screen, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../../context/ThemeContext'

function ThemeReader() {
  const { theme } = useTheme()
  return <span data-testid="theme">{theme}</span>
}

function ThemeToggler() {
  const { theme, toggleTheme } = useTheme()
  return (
    <>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
    </>
  )
}

describe('ThemeContext — ThemeProvider', () => {
  test('provides default theme as "light"', () => {
    render(
      <ThemeProvider>
        <ThemeReader />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  test('toggleTheme switches from light to dark', () => {
    render(
      <ThemeProvider>
        <ThemeToggler />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme')).toHaveTextContent('light')

    act(() => {
      screen.getByRole('button').click()
    })
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  test('toggleTheme switches back from dark to light', () => {
    render(
      <ThemeProvider>
        <ThemeToggler />
      </ThemeProvider>
    )

    act(() => {
      screen.getByRole('button').click()
    })
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')

    act(() => {
      screen.getByRole('button').click()
    })
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })
})

describe('ThemeContext — useTheme', () => {
  test('returns theme and toggleTheme function', () => {
    let contextValue
    function Spy() {
      contextValue = useTheme()
      return null
    }
    render(
      <ThemeProvider>
        <Spy />
      </ThemeProvider>
    )
    expect(contextValue).toHaveProperty('theme')
    expect(contextValue).toHaveProperty('toggleTheme')
    expect(typeof contextValue.toggleTheme).toBe('function')
  })
})
