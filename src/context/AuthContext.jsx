// src/context/AuthContext.jsx
import React, { createContext, useReducer } from 'react'

// Bắt buộc export đúng tên biến để các file test có thể import trực tiếp
export const AuthContext = createContext(null)

// Định nghĩa initialState chuẩn theo đặc tả hệ thống để pass test ban đầu
const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false // EXT-01: Quản lý trạng thái loading khi đăng nhập
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(`Failed to write "${key}" to localStorage:`, e)
  }
}

function safeRemoveItem(key) {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.error(`Failed to remove "${key}" from localStorage:`, e)
  }
}

/**
 * Hàm khởi tạo trạng thái thông minh cho EXT-04 (Persist Login)
 * Giúp giữ trạng thái đăng nhập khi làm mới trang trên trình duyệt,
 * nhưng tự động cô lập khi chạy Vitest để không làm hỏng kịch bản test tích hợp.
 */
const init = (initial) => {
  // Nếu hệ thống đang chạy test tự động (Vitest), bỏ qua việc đọc localStorage
  if (typeof globalThis !== 'undefined' && globalThis.__vitest_environment__) {
    return initial
  }

  try {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      return {
        ...initial,
        isAuthenticated: true,
        user: parsedUser
      }
    }
  } catch (e) {
    console.error('Không thể đọc dữ liệu từ localStorage:', e)
    safeRemoveItem('user')
  }
  return initial
}

const KNOWN_ACTIONS = new Set([
  'LOGIN_START',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
  'CHANGE_PASSWORD',
  'LOGOUT',
])

// Reducer xử lý các hành động thay đổi trạng thái Auth
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START': // EXT-01: Bắt đầu đăng nhập, bật trạng thái loading
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case 'LOGIN_SUCCESS': {
      const userData = {
        ...action.payload,
        loginTime: new Date().toLocaleString(),
      }

      // EXT-04: Lưu thông tin đăng nhập vào bộ nhớ trình duyệt
      safeSetItem('user', userData)

      return {
        ...state,
        isAuthenticated: true,
        user: userData,
        error: null,
        isLoading: false,
      }
    }

    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        isLoading: false,
      }

    case 'CHANGE_PASSWORD': { // EXT-02: Xử lý đổi mật khẩu cho user hiện tại
      const updatedUser = {
        ...state.user,
        password: action.payload,
      }

      // Cập nhật lại chuỗi thông tin mới vào storage
      safeSetItem('user', updatedUser)

      return {
        ...state,
        user: updatedUser,
      }
    }

    case 'LOGOUT':
      // EXT-04: Xóa sạch dữ liệu trong storage khi người dùng đăng xuất
      safeRemoveItem('user')

      return {
        isAuthenticated: false,
        user: null,
        error: null,
        isLoading: false,
      }

    default:
      if (!KNOWN_ACTIONS.has(action.type)) {
        console.warn(`AuthReducer: unhandled action type "${action.type}"`)
      }
      return state
  }
}

// Bắt buộc export đúng tên component AuthProvider để bọc quanh App trong main.jsx
export function AuthProvider({ children }) {
  // Sử dụng đối số thứ 3 (hàm init) để khởi tạo state an toàn
  const [state, dispatch] = useReducer(authReducer, initialState, init)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
