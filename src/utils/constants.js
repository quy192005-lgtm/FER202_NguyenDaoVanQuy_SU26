export const ACTION_TYPES = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
}

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Tên đăng nhập hoặc mật khẩu không đúng',
  NOT_LOGGED_IN: 'Bạn cần đăng nhập để thực hiện chức năng này',
  PASSWORD_TOO_SHORT: 'Mật khẩu mới phải có ít nhất 6 ký tự',
  PASSWORD_MISMATCH: 'Xác nhận mật khẩu không khớp',
  CURRENT_PASSWORD_WRONG: 'Mật khẩu hiện tại không đúng',
}

export const STORAGE_KEYS = {
  USER: 'user',
}
