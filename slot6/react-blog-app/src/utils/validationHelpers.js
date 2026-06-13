const MIN_PASSWORD_LENGTH = 6;

export function validateRequired(value, fieldName) {
  if (!value || !value.trim()) {
    return `${fieldName} là bắt buộc`;
  }
  return null;
}

export function validateMinLength(value, minLength, fieldName) {
  if (value.length < minLength) {
    return `${fieldName} phải có ít nhất ${minLength} ký tự`;
  }
  return null;
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email là bắt buộc';
  if (!emailRegex.test(email)) return 'Email không đúng định dạng';
  return null;
}

export function validatePasswordStrength(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!password) return 'Password là bắt buộc';
  if (password.length < MIN_PASSWORD_LENGTH) return 'Password phải có ít nhất 6 ký tự';
  if (!passwordRegex.test(password)) return 'Password phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt';
  return null;
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Vui lòng xác nhận password';
  if (confirmPassword !== password) return 'Password xác nhận không khớp';
  return null;
}

export function validateRegistrationForm(formData) {
  const errors = {};

  const usernameError = validateRequired(formData.username, 'Username')
    || validateMinLength(formData.username, 3, 'Username');
  if (usernameError) errors.username = usernameError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePasswordStrength(formData.password);
  if (passwordError) errors.password = passwordError;

  const confirmError = validateConfirmPassword(formData.password, formData.confirmPassword);
  if (confirmError) errors.confirmPassword = confirmError;

  return errors;
}
