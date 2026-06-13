const MIN_PASSWORD_LENGTH = 6

export function validatePasswordChange(currentPassword, storedPassword, newPassword, confirmPassword) {
  if (currentPassword !== storedPassword) {
    return 'Mật khẩu hiện tại không đúng'
  }

  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return 'Mật khẩu mới phải có ít nhất 6 ký tự'
  }

  if (newPassword !== confirmPassword) {
    return 'Xác nhận mật khẩu không khớp'
  }

  return null
}

export function validateRequired(value, fieldName) {
  if (!value || !value.trim()) {
    return `${fieldName} là bắt buộc`
  }
  return null
}

export function validateMinLength(value, minLength, fieldName) {
  if (value.length < minLength) {
    return `${fieldName} phải có ít nhất ${minLength} ký tự`
  }
  return null
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return 'Email là bắt buộc'
  if (!emailRegex.test(email)) return 'Email không đúng định dạng'
  return null
}

export function validatePasswordStrength(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  if (!password) return 'Password là bắt buộc'
  if (password.length < MIN_PASSWORD_LENGTH) return 'Password phải có ít nhất 6 ký tự'
  if (!passwordRegex.test(password)) return 'Password phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt'
  return null
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Vui lòng xác nhận password'
  if (confirmPassword !== password) return 'Password xác nhận không khớp'
  return null
}
