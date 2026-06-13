import { Form } from 'react-bootstrap'

function PasswordField({ placeholder, value, onChange, required = false, className = 'mb-3' }) {
  return (
    <Form.Group className={className}>
      <Form.Control
        type="password"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </Form.Group>
  )
}

export default PasswordField
