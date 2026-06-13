import { STORAGE_KEYS } from './constants'

export function saveUser(user) {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
}

export function loadUser() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.USER)
    return saved ? JSON.parse(saved) : null
  } catch (e) {
    console.error('Không thể đọc dữ liệu từ localStorage:', e)
    return null
  }
}

export function removeUser() {
  localStorage.removeItem(STORAGE_KEYS.USER)
}
