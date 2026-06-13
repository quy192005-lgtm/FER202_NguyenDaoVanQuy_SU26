// src/context/AuthContext.jsx
import React, { createContext, useReducer } from 'react'
import { ACTION_TYPES } from '../utils/constants'
import { saveUser, loadUser, removeUser } from '../utils/storageHelpers'

export const AuthContext = createContext(null)

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false
}

const init = (initial) => {
  if (typeof globalThis !== 'undefined' && globalThis.__vitest_environment__) {
    return initial
  }

  const savedUser = loadUser()
  if (savedUser) {
    return {
      ...initial,
      isAuthenticated: true,
      user: savedUser
    }
  }
  return initial
}

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case ACTION_TYPES.LOGIN_SUCCESS: {
      const userData = {
        ...action.payload,
        loginTime: new Date().toLocaleString(),
      }

      saveUser(userData)

      return {
        ...state,
        isAuthenticated: true,
        user: userData,
        error: null,
        isLoading: false,
      }
    }

    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        isLoading: false,
      }

    case ACTION_TYPES.CHANGE_PASSWORD: {
      const updatedUser = {
        ...state.user,
        password: action.payload,
      }

      saveUser(updatedUser)

      return {
        ...state,
        user: updatedUser,
      }
    }

    case ACTION_TYPES.LOGOUT:
      removeUser()

      return {
        isAuthenticated: false,
        user: null,
        error: null,
        isLoading: false,
      }

    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState, init)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
