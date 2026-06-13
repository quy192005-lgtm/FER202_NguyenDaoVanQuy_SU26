import { Alert } from 'react-bootstrap'

function FormAlert({ message, variant = 'danger' }) {
  if (!message) return null

  return (
    <Alert variant={variant} role="alert">
      {message}
    </Alert>
  )
}

export default FormAlert
