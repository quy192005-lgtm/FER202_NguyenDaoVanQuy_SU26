// src/pages/ChangePasswordPage.jsx
import React, { useState } from 'react'
import { Card, Form, Button, Toast } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { ACTION_TYPES, ERROR_MESSAGES } from '../utils/constants'
import { validatePasswordChange } from '../utils/validationHelpers'
import FormAlert from '../components/FormAlert'
import PasswordField from '../components/PasswordField'

function ChangePasswordPage() {
  const { state, dispatch } = useAuth()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!state.user) {
      setError(ERROR_MESSAGES.NOT_LOGGED_IN)
      return
    }

    const validationError = validatePasswordChange(
      currentPassword,
      state.user.password,
      newPassword,
      confirmPassword
    )

    if (validationError) {
      setError(validationError)
      return
    }

    dispatch({
      type: ACTION_TYPES.CHANGE_PASSWORD,
      payload: newPassword,
    })

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')

    setShowToast(true)
  }

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Body>
        <h4 className="mb-3">Change Password</h4>

        <FormAlert message={error} />

        <Form onSubmit={handleSubmit}>
          <PasswordField
            placeholder="Current Password"
            value={currentPassword}
            onChange={setCurrentPassword}
            required
            className="mb-2"
          />

          <PasswordField
            placeholder="New Password"
            value={newPassword}
            onChange={setNewPassword}
            required
            className="mb-2"
          />

          <PasswordField
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            required
          />

          <Button type="submit" variant="primary">
            Save
          </Button>
        </Form>

        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <Toast
            show={showToast}
            delay={3000}
            autohide
            onClose={() => setShowToast(false)}
          >
            <Toast.Header>
              <strong className="me-auto text-success">Success</strong>
            </Toast.Header>
            <Toast.Body>Password changed successfully!</Toast.Body>
          </Toast>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ChangePasswordPage
