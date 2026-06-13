// src/pages/ChangePasswordPage.jsx
import React, { useState } from 'react'
import { Card, Form, Button, Alert, Toast } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { findUser } from '../utils/authHelpers'

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

    // Kiểm tra tính bảo mật khi bóc tách thông tin user phòng trường hợp chưa đăng nhập
    if (!state.user) {
      setError('Bạn cần đăng nhập để thực hiện chức năng này')
      return
    }

    if (!findUser(state.user.username, currentPassword)) {
      setError('Mật khẩu hiện tại không đúng')
      return
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Xác nhận mật khẩu không khớp')
      return
    }

    // Gửi action cập nhật mật khẩu lên reducer toàn cục
    dispatch({
      type: 'CHANGE_PASSWORD',
      payload: newPassword,
    })

    // Reset lại form sau khi đổi thành công
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')

    setShowToast(true)
  }

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Body>
        <h4 className="mb-3">Change Password</h4>

        {error && (
          <Alert variant="danger" role="alert">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Save
          </Button>
        </Form>

        {/* Khối hiển thị Toast thông báo thành công */}
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